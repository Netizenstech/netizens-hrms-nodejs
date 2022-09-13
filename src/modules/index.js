const { join } = require('path');

const { fileLoader, mergeResolvers, mergeTypes } = require('merge-graphql-schemas');

const typesArray = [
  ...fileLoader(join(__dirname, './**/*.graphql'))
];

const resolverArray = fileLoader(join(__dirname, './**/*.resolvers.*'));

const typeDefs = mergeTypes(typesArray);
const resolvers = mergeResolvers(resolverArray);

module.exports = { typeDefs, resolvers };
