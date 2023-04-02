//= Modules
import toast from "react-hot-toast";
//= Queries
import { GET_TODOS } from "../../../graphql/queries";
//= Types
import { TodoTypes } from "../../../types";

export async function executeUpdateTodoCompletion(mutation: Function, data: TodoTypes.Todo) {
  const result = await mutation({
    variables: {
      updateTodoId: data._id,
      data: {
        isCompleted: !data.isCompleted
      }
    },
    refetchQueries: [GET_TODOS],
  });

  if (result.errors) return toast.error(result.errors[0].message);
  toast.success(`Todo item updated to ${data.isCompleted ? 'not completed' : 'completed'}`);
}

export async function executeDeleteTodo(mutation: Function, data: TodoTypes.Todo) {
  const result = await mutation({
    variables: {
      removeTodoId: data._id
    },
    refetchQueries: [GET_TODOS]
  });

  if (result.errors) return toast.error(result.errors[0].message);
  toast.success(`Todo item deleted successfully`);
}