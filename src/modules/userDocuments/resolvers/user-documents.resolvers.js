const createUserDocument = require('./create-user-documents');
const updateUserDocument = require('./update-user-documents');
const UserDocuments = require('./user-documents');
const deleteUserDocument = require('./delete-user-documents');

const resolvers = {
  UserDocumentListing: {
    user_document_id: {
      resolve: UserDocumentListing => UserDocumentListing.user_document_id,
    },
    user_id: {
      resolve: UserDocumentListing => UserDocumentListing.user_id,
    },
    document_name: {
      resolve: UserDocumentListing => UserDocumentListing.document_name,
    },
    document_url: {
      resolve: UserDocumentListing => UserDocumentListing.document_url,
    },
    size: {
      resolve: UserDocumentListing => UserDocumentListing.size,
    },
    createdAt:{
      resolve: UserDocumentListing => UserDocumentListing.createdAt,
    },
    updatedAt:{
      resolve: UserDocumentListing => UserDocumentListing.updatedAt,
    }
  },
  Query: {
    UserDocuments,
  },
  Mutation: {
    createUserDocument,
    updateUserDocument,
    deleteUserDocument
  },
};

module.exports = resolvers;
