import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:9999/graphql',
    credentials: 'include',
    headers: {
      'Apollo-Require-Preflight': 'true' //==> Enables file uploads (by default GraphQL prevents file upload by its csrf prevention feature)
    }
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Todo: {
        keyFields: ["_id"],
      },
      User: {
        keyFields: ["_id"],
      },
    }
  }),
  connectToDevTools: true
});

export default client