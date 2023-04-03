export const TodoType = `#graphql
  type Todo {
    _id: ID!
    content: String!
    isCompleted: Boolean
    author: User
  }
  type TodosResponse {
    data: [Todo]
    count: Int
  }
`;

export const TodoInputs = `#graphql
  input TodoData {
    user: ID!
    content: String!
  }
  input UpdateTodoData {
    content: String
    isCompleted: Boolean
  }
  input TodoFilters {
    search: String
    limit: Int
    skip: Int
  }
`;

export const TodoQueries = `#graphql
  todos(filters: TodoFilters): TodosResponse
  todo(id: ID!): Todo
`;

export const TodoMutations = `#graphql
  addTodo(data: TodoData): Todo
  updateTodo(id: ID!, data: UpdateTodoData): Todo
  removeTodo(id: ID!): Todo
`;