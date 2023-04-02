import { gql } from '@apollo/client';

export const ADD_TODO = gql`
  mutation AddTodo($data: TodoData) {
    addTodo(data: $data) {
      _id
      content
      isCompleted
    }
  }
`;
