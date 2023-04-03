import React from 'react';
//= Modules
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
//= Mutations Queries
import { UPDATE_TODO_COMPLETION, DELETE_TODO } from "../../../../graphql/queries";
//= Mutations
import { executeUpdateTodoCompletion, executeDeleteTodo } from './logic';
//= Types
import { TodoTypes } from '../../../../types';

interface IProps {
  setIsEditMode: React.Dispatch<React.SetStateAction<TodoTypes.Todo | false>>;
  data: TodoTypes.Todo
}

function Todo({ setIsEditMode, data }: IProps) {
  const [updateTodoCompletion] = useMutation(UPDATE_TODO_COMPLETION);
  const [deleteTodo] = useMutation(DELETE_TODO);

  function handleEdit() {
    setIsEditMode(data);
    document.querySelector<HTMLInputElement>('#todo-input')!.value = data.content;
  }

  async function handleCompletion() {
    await executeUpdateTodoCompletion(updateTodoCompletion, data);
  }

  async function handleDelete() {
    const confirmResult = await Swal.fire({
      title: `Do you want to delete this todo item? \n '${data.content}'`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (confirmResult.isConfirmed) await executeDeleteTodo(deleteTodo, data);
  }

  return (
    <div className="todo">
      <p onClick={handleCompletion} className={data.isCompleted ? 'todo-completed' : ''}>{data.content}</p>
      <div className="actions">
        <span title='Edit' onClick={handleEdit}><i className="fi fi-rr-edit"></i></span>
        <span title='Delete' onClick={handleDelete}><i className="fi fi-rr-trash"></i></span>
      </div>
    </div>
  )
}

export default Todo