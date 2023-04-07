//= Logic Hook
import useAuthInfoLogic from './logic';
//= Styles
import "./auth.css";

const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

function AuthInfo() {
  const { currentUser, handleLogout, goToProfile } = useAuthInfoLogic();

  if (!currentUser) return <p>No User Found</p>

  return (
    <div className="auth-info">
      <div className="user" onClick={goToProfile}>
        <img src={currentUser.picture || DEFAULT_IMAGE} alt="auht-user-image" />
        <p>{currentUser.username}</p>
      </div>
      <i className="fi fi-br-power" title="Logout ?" onClick={handleLogout}></i>
    </div>
  )
}

export default AuthInfo;