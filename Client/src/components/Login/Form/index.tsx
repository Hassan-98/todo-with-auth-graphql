//= Modules
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
//= Logics
import { Login } from './logic';
//= Styles
import './form.css';

function LoginForm() {
  const navigate = useNavigate();

  async function handleLogin() {
    const email = document.querySelector<HTMLInputElement>('#email')!.value;
    const password = document.querySelector<HTMLInputElement>('#password')!.value;

    try {
      const res = await Login({ email, password });
      if (res) navigate('/');
    } catch (error: any) {
      if (error.response?.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  }

  return (
    <div className="login-form">
      <h1>Login</h1>
      <div className="input">
        <input type="email" placeholder="Email address" id="email" />
      </div>
      <div className="input">
        <input type="password" placeholder="Password" id="password" />
      </div>
      <div className="button">
        <button onClick={handleLogin}>Login</button>
      </div>
      <hr />
      <p>Don't have an account ? <Link to="/signup">create a new account</Link> </p>
    </div>
  )
}

export default LoginForm