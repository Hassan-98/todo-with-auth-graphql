import { useState } from 'react';
//= Modules
import Swal from 'sweetalert2';
import { useNavigate, useLoaderData } from "react-router-dom";
import { toast } from 'react-hot-toast';
//= Components
import TodoForm from '../components/Home/Form';
import Todos from '../components/Home/Todos';
//= API
import api from '../helpers/axios';
//= Types
import { UserTypes, TodoTypes } from '../types';

function App() {
  const [isEditMode, setIsEditMode] = useState<TodoTypes.Todo | false>(false);
  const navigate = useNavigate();
  const currentUser = useLoaderData() as UserTypes.User;

  async function handleLogout() {
    const result = await Swal.fire({
      title: 'Do you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    });

    if (result.isConfirmed) {
      try {
        await api.post('/auth/logout');
        navigate('/login');
      } catch (error: any) {
        if (error.response?.data) toast.error(error.response.data.message);
        else toast.error(error.message);
      }
    }
  }

  return (
    <div className="card">
      <h1>My Tasks</h1>
      <p className="auth">
        {
          currentUser &&
          <>
            <span className="username">{currentUser.username}</span> - <i className="fi fi-br-sign-out-alt" title="Sign out ?" onClick={handleLogout}></i>
          </>
        }
      </p>
      <hr />
      <TodoForm isEditMode={isEditMode} setIsEditMode={setIsEditMode} currentUser={currentUser} />
      <Todos setIsEditMode={setIsEditMode} />
    </div>
  )
}

export default App
