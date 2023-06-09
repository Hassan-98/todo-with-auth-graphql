import { gql } from '@apollo/client';

export const UPDATE_TODO_COMPLETION = gql`
  mutation UpdateTodoCompletion($updateTodoId: ID!, $data: UpdateTodoData) {
    updateTodo(id: $updateTodoId, data: $data) {
      _id
      isCompleted
    }
  }
`;

export const UPDATE_TODO_CONTENT = gql`
  mutation UpdateTodoCompletion($updateTodoId: ID!, $data: UpdateTodoData) {
    updateTodo(id: $updateTodoId, data: $data) {
      _id
      content
    }
  }
`;