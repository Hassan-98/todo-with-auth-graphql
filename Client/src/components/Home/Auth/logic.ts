//= Modules
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useQuery } from '@apollo/client';
//= Queries
import { GET_CURRENT_USER } from '../../../graphql/queries';
//= Types
import { UserTypes } from '../../../types';
//= API
import api from '../../../helpers/axios';

function useAuthInfoLogic() {
  const navigate = useNavigate();
  const { loading, data: currentUserData, error } = useQuery(GET_CURRENT_USER);

  const { currentUser }: { currentUser: UserTypes.User } = currentUserData;

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

  function goToProfile() {
    navigate('/profile')
  }

  return {
    currentUser,
    handleLogout,
    goToProfile
  }
}

export default useAuthInfoLogic