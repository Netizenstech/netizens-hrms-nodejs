const { separateOperations } = require('graphql');
const { getComplexity, simpleEstimator } = require('graphql-query-complexity');

const logger = require('./logger');

const queryComplexityPlugin = schema => ({
  requestDidStart: () => ({
    didResolveOperation ({ request, document }) {
      const complexity = getComplexity({
        schema,
        query: request.operationName
          ? separateOperations(document)[request.operationName]
          : document,
        variables: request.variables,
        estimators: [
          simpleEstimator({
            defaultComplexity: 1
          })
        ]
      });
      const COMPLEXITY_THRESHOLD = Number(process.env.COMPLEXITY_THRESHOLD) || 60;
      if (complexity >= COMPLEXITY_THRESHOLD) {
        logger.info(`EXCEEDED_QUERY_COMPLEXITY : ${complexity}`);
        throw new Error('INVALID REQUEST');
      }
    }
  })
});

module.exports = {
  queryComplexityPlugin
};
