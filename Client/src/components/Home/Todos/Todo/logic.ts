//= Modules
import Swal from 'sweetalert2';
import toast from "react-hot-toast";
import { useMutation } from '@apollo/client';
//= Queries
import { GET_TODOS } from "../../../../graphql/queries";
//= Types
import { TodoTypes } from "../../../../types";
//= Mutations Queries
import { UPDATE_TODO_COMPLETION, DELETE_TODO } from "../../../../graphql/queries";

interface IProps {
  setIsEditMode: React.Dispatch<React.SetStateAction<TodoTypes.Todo | false>>;
  data: TodoTypes.Todo
}

function useTodoLogic({ setIsEditMode, data }: IProps) {
  const [updateTodoCompletion] = useMutation(UPDATE_TODO_COMPLETION);
  const [deleteTodo] = useMutation(DELETE_TODO);

  async function handleCompletion() {
    const result = await updateTodoCompletion({
      variables: {
        updateTodoId: data._id,
        data: { isCompleted: !data.isCompleted }
      },
    });

    if (result.errors) return toast.error(result.errors[0].message);
    toast.success(`Todo item updated to ${data.isCompleted ? 'not completed' : 'completed'}`);
  }

  async function handleDelete() {
    const confirmResult = await Swal.fire({
      title: `Do you want to delete this todo item? \n '${data.content}'`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (confirmResult.isConfirmed) {
      const result = await deleteTodo({
        variables: { removeTodoId: data._id },
        refetchQueries: [GET_TODOS]
      });

      if (result.errors) return toast.error(result.errors[0].message);
      toast.success(`Todo item deleted successfully`);
    }
  }

  function handleEdit() {
    setIsEditMode(data);
    document.querySelector<HTMLInputElement>('#todo-input')!.value = data.content;
  }

  return {
    handleEdit,
    handleDelete,
    handleCompletion
  }
}

export default useTodoLogic;