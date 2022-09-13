/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const {
  jwt: { secret: JWT_SECRET },
} = require("../../config/config");
const logger = require("../logger");
const { models, Sequelize } = require("../models");
const { getUser } = require("../utils/context");
const { getMessage } = require("../utils/messages");
const { generateToken } = require("../utils/token");
const { uploadProductImage } = require("./fileUpload");

const allowedUrls = [
  "/graphql",
  "/login",
  "/callback",
  "/metrics",
  "/user-not-found",
  "/unauthorized",
  "/healthz",
  "/version",
  "/refresh-token",
  "/uploadFile",
  "/public/*",
  "/changeEmployeeProbationStatus",
];

const authRouteMiddleware =
  (whiteList = []) =>
  async (req, res, next) => {
    if (whiteList.findIndex((url) => req.originalUrl === url) !== -1) {
      return next();
    }

    const token = req.headers.authorization;
    if (!token) {
      logger.error("No token provided in header!");
      // Sentry.captureMessage('No token provided in header!');
      return res.status(401).json({ message: getMessage("UNAUTHORIZED") });
    }

    const user = await getUser(req, res, models.User);
    if (!user) {
      throw new Error("User not found!");
    }

    req.user = user;
    return next();
  };

const functions = (app) => {
  const {
    User: UserModel,
    UserDocument: UserDocumentModel,
    Organization: OrganizationModel,
    Employee: EmployeeModel,
    OrganizationProbationPolicy: OrganizationProbationPolicyModel,
  } = models;

  const setRefreshToken = async (user) => {
    let refreshToken;
    if (user.refreshToken) {
      refreshToken = user.refreshToken;
    } else {
      refreshToken = jwt.sign({ userId: user.user_id }, JWT_SECRET);
      await UserModel.update(
        { refreshToken },
        { where: { user_id: user.user_id } }
      );
    }

    return refreshToken;
  };

  app.post("/login", async (req, res) => {
    try {
      logger.info("/login");
      const { email, password } = req.body;

      var user = await UserModel.findOne({ where: { email } });

      if (!user) {
        // throw new Error(getMessage('USER_NOT_FOUND'));
        res.status(200).json({ res: 0, message: getMessage("USER_NOT_FOUND") });
      } else {
        user = JSON.parse(JSON.stringify(user));
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          // throw new Error(getMessage('INVALID_CREDENTIALS'));
          res
            .status(200)
            .json({ res: 0, message: getMessage("INVALID_CREDENTIALS") });
        } else {
          try {
            const token = await generateToken(user.user_id);
            const refresh_token = await setRefreshToken(user);

            await UserModel.update(
              { refreshToken: refresh_token },
              { where: { user_id: user.user_id }, returning: true }
            );
            return res.status(200).json({
              res: 1,
              access_token: token,
              refresh_token,
              user: user,
              message: getMessage("LOGIN_SUCCESSFULLY"),
            });
          } catch (error) {
            console.error(error);
            return res
              .status(200)
              .json({ res: 0, message: "Please verify email id or password." });
          }
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong, try again" });
    }
  });

  app.post("/refresh-token", async (req, res) => {
    logger.info("/refresh-token");
    // const { refreshToken } = req.body;
    const refreshToken = req.body.refresh_token;
    if (refreshToken) {
      try {
        let user = await UserModel.findOne({ where: { refreshToken } });
        if (!user) {
          logger.error("ERROR > REFRESH_TOKEN > Invalid refresh token");
          return res.status(401).json({ message: getMessage("INVALID_TOKEN") });
        }
        try {
          user = JSON.parse(JSON.stringify(user));
          const token = await generateToken(user.user_id);
          const refresh_token = await setRefreshToken(user);
          return res.status(200).json({
            access_token: token,
            refresh_token,
            user: user,
            message: getMessage("REFRESH_TOKEN"),
          });
        } catch (err) {
          console.error(err);
          return res.sendStatus(400);
        }
      } catch (err) {
        console.error(err);
        return res.sendStatus(400);
      }
    } else {
      logger.error("Bad Request to /refresh-token");
      return res.sendStatus(400);
    }
  });

  // app.post('/uploadFile',uploadProductImage.single('image'), async (req, res) => {
  //   logger.info('/uploadFile');
  //   // console.log(req.body)
  //   // const { refreshToken } = req.body;
  //   try {
  //     console.log("first")
  //     return res.sendStatus(200);
  //   } catch (err) {
  //     logger.error('Bad Request to /refresh-token');
  //     return res.sendStatus(400);
  //   }
  // });

  app.post(
    "/uploadProfile",
    uploadProductImage.single("image"),
    async (req, res) => {
      logger.info("/uploadProfile");
      // console.log(req.body)
      // const { refreshToken } = req.body;
      try {
        UserModel.update(
          {
            profile_url: req.file.filename,
          },
          {
            where: { user_id: req.user.user_id },
          }
        );

        return res
          .status(200)
          .send({ message: getMessage("USER_PROFILE_UPDATE_SUCCESS") });
      } catch (err) {
        logger.error("Bad Request to /refresh-token");
        return res.sendStatus(400);
      }
    }
  );

  app.post(
    "/uploadDocument",
    uploadProductImage.single("image"),
    async (req, res) => {
      logger.info("/uploadDocument");
      try {
        await UserDocumentModel.create(
          {
            user_id: req.user.user_id,
            document_name: req.file.originalname,
            document_url: req.file.filename,
            size: req.file.size,
          },
          { returning: true }
        );
        return res
          .status(200)
          .send({ message: getMessage("USER_DOCUMENT_CREATE_SUCCESS") });
      } catch (err) {
        logger.error("Bad Request to /refresh-token");
        return res.sendStatus(400);
      }
    }
  );

  app.post(
    "/uploadOrganizationLogo",
    uploadProductImage.single("image"),
    async (req, res) => {
      logger.info("/uploadOrganizationLogo");
      try {
        await OrganizationModel.update(
          {
            organization_logo: req.file.filename,
          },
          {
            where: { organization_id: req.body.organization_id },
          }
        );
        return res
          .status(200)
          .send({ message: getMessage("ORGANIZATION_LOGO_UPLOAD_SUCCESS") });
      } catch (err) {
        logger.error("Bad Request to /refresh-token");
        return res.sendStatus(400);
      }
    }
  );

  app.post(
    "/uploadOrganizationBackgroundImage",
    uploadProductImage.single("image"),
    async (req, res) => {
      logger.info("/uploadOrganizationBackgroundImage");
      try {
        await OrganizationModel.update(
          {
            organization_background: req.file.filename,
          },
          {
            where: { organization_id: req.body.organization_id },
          }
        );
        return res.status(200).send({
          message: getMessage("ORGANIZATION_BACKGROUND_IMAGE_UPLOAD_SUCCESS"),
        });
      } catch (err) {
        logger.error("Bad Request to /refresh-token");
        return res.sendStatus(400);
      }
    }
  );

  app.get("/changeEmployeeProbationStatus", async (req, res) => {
    logger.info("/changeEmployeeProbationStatus");
    try {
      let employees = await EmployeeModel.findAll({
        where: {
          probation_end_date: {
            [Sequelize.Op.lte]: moment(new Date()).format("YYYY-MM-DD"),
          },
          probation_status: 0,
        },
        attributes: [
          "employee_id",
          "organization_probation_policy_id",
          "probation_end_date",
        ],
        include: [
          {
            require: true,
            model: models.OrganizationProbationPolicy,
            where: { end_emp_probation_automatic: true },
            attributes: [
              "organization_probation_policy_id",
              "end_emp_probation_automatic",
            ],
          },
        ],
      });
      try {
        employees = JSON.parse(JSON.stringify(employees));
        var updateEmpIds = [];
        if (employees.length) {
          employees.forEach((ele) => {
            updateEmpIds.push(ele.employee_id);
          });
          await EmployeeModel.update(
            { probation_status: 1 },
            { where: { employee_id: { [Sequelize.Op.in]: updateEmpIds } } }
          );
        }
        return res
          .status(200)
          .json({ message: getMessage("UPDATE_PROBATION_STATUS_SUCCESS") });
      } catch (err) {
        console.error(err);
        return res.sendStatus(400);
      }
    } catch (err) {
      console.error(err);
      return res.sendStatus(400);
    }
  });
};

module.exports = { allowedUrls, functions, authRouteMiddleware };
