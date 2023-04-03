import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query Todos($filters: TodoFilters) {
    todos(filters: $filters) {
      data {
          _id
        content
        isCompleted
      }
      count
    }
  }
`;