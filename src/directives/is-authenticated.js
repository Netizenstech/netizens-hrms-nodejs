const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

const logger = require('../logger');
const { getUser } = require('../utils/context');

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    try {
      this.field = field;
      const { resolve = defaultFieldResolver } = this.field;

      this.field.resolve = async (...args) => {
        const context = args[2];

        context.req.user = await getUser(context.req, context.models.User);
        if (!context || !context.req || !context.req.user) {
          throw new AuthenticationError('Not Authorized!');
        }

        return resolve.apply(this, args);
      };
    } catch (err) {
      logger.error('ERROR WHILE Authentication >>>', err);
      throw err;
    }
  }
}

module.exports = {
  directive: IsAuthenticatedDirective
};
