import express, { Application } from 'express';
import { ApolloServer, AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import { formatError } from './common/errors/errorHandlers'
import 'dotenv/config';
import { findPayload } from './common/utils/tokenUtils'

const startServer = async () => {
  const app: Application = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: ({ req }) => {
      const token = req.headers.authorization || ''
      const payload = findPayload(token.replace('Bearer ', ''))

      if (!payload) throw new ForbiddenError("No tiene acceso a este recuerso")
      return { user: payload, headers: req.headers }
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();