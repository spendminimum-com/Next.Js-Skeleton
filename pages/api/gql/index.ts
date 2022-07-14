import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { createContext } from '../../../backend/gql/context';
import { resolvers } from '../../../backend/gql/resolver';
import { schema } from '../../../backend/gql/schema';

const cors = Cors();

const server = new ApolloServer({ schema, resolvers, context: createContext });

const startServer = server.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(async function graphql(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await server.createHandler({ path: '/api/gql' })(req, res);
});
