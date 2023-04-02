//= Modules
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
//= Mutations
import { ADD_TODO, UPDATE_TODO_CONTENT } from "../../../graphql/queries";
//= Types
import { UserTypes, TodoTypes } from '../../../types';
import { AddTodo, EditTodo } from './logic';

interface IProps {
  isEditMode: TodoTypes.Todo | false;
  setIsEditMode: React.Dispatch<React.SetStateAction<TodoTypes.Todo | false>>;
  currentUser: UserTypes.User
}

function TodoForm({ isEditMode, setIsEditMode, currentUser }: IProps) {
  const [addTodo] = useMutation(ADD_TODO);
  const [editTodoContent] = useMutation(UPDATE_TODO_CONTENT);

  async function handleEditTodo() {
    if (isEditMode) {
      const toBeEditedTodo = isEditMode;
      const data = {
        _id: toBeEditedTodo._id,
        content: document.querySelector<HTMLInputElement>('#todo-input')!.value || "",
      }

      const isDone = await EditTodo(editTodoContent, data);
      if (isDone) setIsEditMode(false);
    } else {
      toast.error('Something went wrong editing todo')
    }
  }

  async function handleAddTodo() {
    const data = {
      content: document.querySelector<HTMLInputElement>('#todo-input')!.value || "",
      isCompleted: false,
      author: currentUser._id
    }

    await AddTodo(addTodo, data);
  }

  return (
    <div className="inputs">
      <input type="text" placeholder='Type your todo content' id="todo-input" />
      {
        isEditMode ?
          <button onClick={handleEditTodo}>Edit Todo</button>
          :
          <button onClick={handleAddTodo}>Add Todo</button>
      }
    </div>
  )
}

export default TodoForm