import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLUpload } from 'graphql-upload-ts';
//= Resolvers
import { UserQueryResolvers, UserMutationResolvers } from '../components/User/user.resolvers';
import { TodoQueryResolvers, TodoMutationResolvers } from '../components/Todo/todo.resolvers';
//= TypeDefs
import { UserType, UserInputs, UserQueries, UserMutations } from '../components/User/user.typedefs';
import { TodoType, TodoInputs, TodoQueries, TodoMutations } from '../components/Todo/todo.typedefs';//= Models
import USER from '../components/User/user.model';
import TODO from '../components/Todo/todo.model';
//= Types
import { ExtendedRequest, Context } from '../types';

const typeDefs = `#graphql
  scalar Upload
  # USERs
  ${UserType} ${UserInputs}
  # TODOs
  ${TodoType} ${TodoInputs}

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

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  csrfPrevention: true
});

const startGraphQL = async () => {
  await server.start();
  return expressMiddleware(server, {
    context: async ({ req }) => ({
      req: req as ExtendedRequest,
      USER,
      TODO
    })
  })
}

export default startGraphQL;