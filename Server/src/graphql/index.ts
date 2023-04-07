import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLUpload } from 'graphql-upload-ts';
//= Resolvers
import { UserQueryResolvers, UserMutationResolvers } from '../components/User/user.resolvers';
import { TodoQueryResolvers, TodoMutationResolvers } from '../components/Todo/todo.resolvers';
//= TypeDefs
import { UserType, UserInputs, UserQueries, UserMutations } from '../components/User/user.typedefs';
import { TodoType, TodoInputs, TodoQueries, TodoMutations } from '../components/Todo/todo.typedefs';

const typeDefs = `#graphql
  scalar Upload
  # USERs
  ${UserType} ${UserInputs}
  # TODOs
  ${TodoType} ${TodoInputs}

  type Response {
    success: Boolean!
    message: String
  }

  # Query
  type Query {
    ${UserQueries}
    ${TodoQueries}
  }
  # Mutation
  type Mutation {
    ${UserMutations}
    ${TodoMutations}
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...UserQueryResolvers,
    ...TodoQueryResolvers,
  },
  Mutation: {
    ...UserMutationResolvers,
    ...TodoMutationResolvers
  }
};

interface Context {
  req: Express.Request
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  csrfPrevention: true
});

const startGraphQL = async () => {
  await server.start();
  return expressMiddleware(server, {
    context: async ({ req }: { req: Express.Request }) => ({ req })
  })
}

export default startGraphQL;