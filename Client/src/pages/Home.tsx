import { useState } from 'react';
//= Modules
import { useLoaderData } from "react-router-dom";
//= Components
import AuthInfo from '../components/Home/Auth';
import TodoForm from '../components/Home/Form';
import Todos from '../components/Home/Todos';
//= Types
import { UserTypes, TodoTypes } from '../types';

function Home() {
  const [isEditMode, setIsEditMode] = useState<TodoTypes.Todo | false>(false);
  const currentUser = useLoaderData() as UserTypes.User;

  return (
    <>
      <AuthInfo />
      <div className="card">
        <h1>My Tasks</h1>
        <TodoForm isEditMode={isEditMode} setIsEditMode={setIsEditMode} currentUser={currentUser} />
        <Todos setIsEditMode={setIsEditMode} />
      </div>
    </>
  )
}

export default Home
