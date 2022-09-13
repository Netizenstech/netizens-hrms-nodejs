/* eslint-disable max-len */
/* eslint-disable no-console */
require("dotenv").config();
const { createServer } = require("http");
const cors = require("cors");
const express = require("express");
const createGraphQLLogger = require("graphql-log");
const helmet = require("helmet");
const CONFIG = require("../config/config");
const packageJson = require("../package.json");
const bootFiles = require("./boot");
const logger = require("./logger");
const { sequelize } = require("./models");
const { models } = require("./models");
const { resolvers } = require("./modules");
const {
  allowedUrls,
  functions: restSetup,
  authRouteMiddleware,
} = require("./rest");
const { mongoDBInit } = require("./models/mongoose");
const { generateApolloServer } = require("./apollo-server");
const path = require("path");

// const { graphqlUploadExpress } = require('graphql-upload/graphqlUploadExpress');
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 1000000 })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("*", (req, res, next) => {
  const query = req.query.query || req.body.query || "";
  const QUERY_LENGTH_LIMIT = Number(process.env.QUERY_LENGTH_LIMIT) || 3500;
  if (query.length > QUERY_LENGTH_LIMIT) {
    logger.info(`QUERY LENGTH EXCEEDED ${QUERY_LENGTH_LIMIT} => ${query}`);
    res.status(400).send({
      errors: [
        {
          message: "INVALID REQUEST",
        },
      ],
    });
  }
  next();
});

// app.use(graphqlUploadExpress());
// Comment this if apollo playground keeps loading
// secure express app
// app.use(helmet({
//   contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false ,
//   dnsPrefetchControl: false,
//   frameguard: false,
//   ieNoOpen: false,
// }));

const logExecutions = createGraphQLLogger({
  logger: logger.info,
});

logExecutions(resolvers);

const httpServer = createServer(app);
const apolloServer = generateApolloServer(httpServer);

let httpExpressServer;

// Add allowed urls only
app.use(authRouteMiddleware(allowedUrls));

// Integrate http requests
restSetup(app);

// Add version path
app.get("/version", (req, res) => {
  res.json({
    version: packageJson.version,
  });
});

startServer = async () => {
  // Start Apollo server
  await apolloServer.start();
  logger.info(`🚀 Apollo Server Running!!!`);

  // Apply Middle wares and graphql playground path
  apolloServer.applyMiddleware({ app, path: "/graphql" });
  logger.info(` - Middleware Added`);

  // Initialise sequelize server with postgres
  // NOTE: TOGGLE COMMITS IF RESET DB
  // await sequelize.sync({ force: true });
  await sequelize.sync();

  logger.info(`🚀 Sequelize Sync Complete!!!`);

  // Establish Mongodb connection
  await mongoDBInit();
  logger.info(`🚀 Mongo DB Init Complete!!!`);

  // ON BOOT
  await bootFiles(models);
  logger.info(`🚀 Users Initialised!!!`);

  // Express server
  httpExpressServer = httpServer.listen(CONFIG.port, () => {
    logger.info(
      `🚀 Query endpoint ready at http://localhost:${CONFIG.port}${apolloServer.graphqlPath}`
    );
    logger.info(
      `🚀 Subscription endpoint ready at ws://localhost:${CONFIG.port}${apolloServer.requestOptions.subscriptions.path}`
    );
    logger.info(`WITH DEPTH_LIMIT of ${CONFIG.DEPTH_LIMIT_CONFIG}`);
  });
};

//Handle if server closed by docker/hosted server/machine error/external factor
const exitHandler = () => {
  if (httpExpressServer) {
    httpExpressServer.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (httpExpressServer) {
    httpExpressServer.close();
  }
});

startServer();
module.exports = app;
