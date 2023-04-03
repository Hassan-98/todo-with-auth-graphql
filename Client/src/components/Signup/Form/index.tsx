//= Modules
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
//= Logics
import { Signup } from './logic';
//= Styles
import './form.css';

function SignupForm() {
  const navigate = useNavigate();

  async function handleSignup() {
    const username = document.querySelector<HTMLInputElement>('#username')!.value;
    const email = document.querySelector<HTMLInputElement>('#email')!.value;
    const password = document.querySelector<HTMLInputElement>('#password')!.value;
    const confirmPassword = document.querySelector<HTMLInputElement>('#confirm-password')!.value;

    try {
      const res = await Signup({ username, email, password, confirmPassword });
      if (res) navigate('/');
    } catch (error: any) {
      if (error.response?.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  }

  return (
    <div className="singup-form">
      <h1>Create Account</h1>
      <div className="input">
        <input type="text" placeholder="Username" id="username" />
      </div>
      <div className="input">
        <input type="email" placeholder="Email address" id="email" />
      </div>
      <div className="input">
        <input type="password" placeholder="Password" id="password" />
      </div>
      <div className="input">
        <input type="password" placeholder="Confirm Password" id="confirm-password" />
      </div>
      <div className="button">
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  )
}

export default SignupForm