import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetAllTodos {
    todos {
      _id
      content
      isCompleted
    }
  }
`;