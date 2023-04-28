export const TodoType = `#graphql
  type Todo {
    _id: ID!
    content: String!
    isCompleted: Boolean
    author: User
  }
  type TodosResponse {
    items: [Todo]
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
  input TodoQuery {
    limit: Int
    skip: Int
    filter: String
    sort: String
  }
`;

export const TodoQueries = `#graphql
  todos(query: TodoQuery): TodosResponse
  todo(id: ID!): Todo
`;

export const TodoMutations = `#graphql
  addTodo(data: TodoData): Todo
  updateTodo(id: ID!, data: UpdateTodoData): Todo
  removeTodo(id: ID!): Todo
`;