import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
  mutation UpdateTodoCompletion($removeTodoId: ID!) {
    removeTodo(id: $removeTodoId) {
      _id
    }
  }
`;
