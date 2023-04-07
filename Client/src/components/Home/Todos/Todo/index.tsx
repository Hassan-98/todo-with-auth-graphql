import React from 'react';
//= Mutations
import useTodoLogic from './logic';
//= Types
import { TodoTypes } from '../../../../types';

interface IProps {
  setIsEditMode: React.Dispatch<React.SetStateAction<TodoTypes.Todo | false>>;
  data: TodoTypes.Todo
}

function Todo({ setIsEditMode, data }: IProps) {
  const { handleCompletion, handleEdit, handleDelete } = useTodoLogic({ data, setIsEditMode });

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