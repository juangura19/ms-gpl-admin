import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AppGraphQLError } from './errorTypes';
import { logError } from '../utils/logger';
import { http } from 'winston';

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (error.originalError instanceof AppGraphQLError) {
    const customError = error.originalError as AppGraphQLError;
    return {
      message: customError.message,
      extensions: {
        code: customError.type,
        http:403
      }
    };
  }
  return {
    message: error.message,
    extensions: {
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      http:error.extensions.http
    }
  };
};
