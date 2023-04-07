//= Components
import AuthInfo from '../components/Home/Auth';
import Form from "../components/Profile/Form";

function Profile() {
  return (
    <div className="profile">
      <AuthInfo />
      <Form />
    </div>
  )
}

export default Profile
