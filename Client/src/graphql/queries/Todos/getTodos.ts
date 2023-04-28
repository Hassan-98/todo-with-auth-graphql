import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query Todos($query: TodoQuery) {
    todos(query: $query) {
      items {
        _id
        content
        isCompleted
      }
      count
    }
  }
`;