const { ApolloError } = require("apollo-server-core");
const { getUser } = require("../utils/context");
const status = require("http-status");
const isRequestingUserAlsoOwner = ({ ctx, userId, type, typeId }) =>
  ctx.db.exists[type]({ id: typeId, user: { id: userId } });

const directiveResolvers = {
  isAuthenticated: async (next, source, args, ctx) => {
    try {
      const user = await getUser(ctx.req, ctx.res, ctx.models.User);
      if (!user) {
        throw new Error("User not found!");
      }
      ctx.req.user = user;
      return next();
    } catch (err) {
      // console.log("1")
      throw new ApolloError("Expire Token!", "401");
      // throw new Error('Expire Token!');
    }
  },
  hasRole: async (next, source, { roles }, ctx) => {
    const user = await getUser(ctx.req, ctx.res, ctx.models.User);
    if (!user) {
      throw new Error("User not found!");
    }

    if (roles.includes(user.role)) {
      ctx.req.user = user;
      return next();
    }
    throw new Error("Unauthorized, incorrect role");
  },
  isOwner: async (next, source, { type }, ctx) => {
    let typeId = null;

    if (source && source.id) {
      typeId = source.id;
    } else {
      typeId = ctx.req.body.variables.id;
    }
    const user = await getUser(ctx.req, ctx.res, ctx.models.User);
    if (!user) {
      throw new Error("User not found!");
    }
    const isOwner =
      type === "User"
        ? user.id === typeId
        : await isRequestingUserAlsoOwner({
            ctx,
            userId: user.user_id,
            type,
            typeId,
          });
    if (isOwner) {
      return next();
    }
    throw new Error("Unauthorized, must be owner");
  },
};

module.exports = { directiveResolvers };
