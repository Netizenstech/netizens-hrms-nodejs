const { resolvers, typeDefs } = require('./modules');
const { validateToken } = require('./utils/context');
const { queryComplexityPlugin } = require('./queryComplexityPlugin');
const { directiveResolvers } = require('./directives/auth-directive');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const { createRateLimitDirective } = require('graphql-rate-limit');
const CONFIG = require('../config/config');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServerPluginDrainHttpServer, HttpQueryError } = require('apollo-server-core');
const depthLimitRule = require('./utils/depthLimitRule');
const { useServer } = require('graphql-ws/lib/use/ws');
const {models} = require('./models')
const { WebSocketServer } = require('ws');
const logger = require('./logger');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');


const StatusRaisingPlugin = {
  requestDidStart(){
    return {
      willSendResponse(requestContext) {
        for (const { originalError } of requestContext.errors || []) {
          if (originalError && originalError.extensions && originalError.extensions.code) {
            throw new HttpQueryError(originalError.extensions.code, originalError.message, false);
          }
        }
      },
    };
  },
};


// Rate limit for DDOS attacks
const rateLimitDirective = createRateLimitDirective({
  identifyContext: (ctx) => ctx.id,
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
});


const generateApolloServer = (httpServer) => {
  // Set up WebSocket server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);
  return new ApolloServer({
    schema,
    schemaDirectives: {
      rateLimit: rateLimitDirective,
    },
    introspection: true,
    playground: true,
    // csrfPrevention: true,
    // cache: 'bounded',
    plugins: [
      StatusRaisingPlugin,
      queryComplexityPlugin(schema),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    formatError: (error) => {
      // Sentry.captureException(error);
      logger.error(error);
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '');
        return {
          ...error,
          message,
        };
    },
    context: async (ctx) => ({
      req: ctx.req,
      res: ctx.res,
      models,
      pubsub,
    }),
    subscriptions: {
      path: '/graphql',
      onConnect: (connectionParams) => {
        if (CONFIG.env === 'development') {
          logger.info('------------onConnect---------------');
        }
        if (connectionParams && connectionParams.authorization) {
          return validateToken(connectionParams.authorization, models.user)
            .then((user) => ({
              user,
            }))
            .catch((err) => {
              console.error(err);
              throw new AuthenticationError('Not Authorized!');
            });
        }
        throw new Error('Missing auth token!');
      },
      onDisconnect: () => {
        if (CONFIG.env === 'development') {
          logger.info('------------onDisconnect---------------');
        }
      },
    },
    validationRules: [depthLimitRule(CONFIG.DEPTH_LIMIT_CONFIG)],
  });
};
module.exports = { generateApolloServer };
