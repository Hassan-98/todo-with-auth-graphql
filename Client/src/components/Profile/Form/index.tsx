//= Logic Hook
import useProfileFormLogic from './logic';
//= Styles
import "./form.css";

const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

function Form() {
  const {
    currentUser,
    handleUpdateUserInfo,
    handleUpdateUserPassword,
    handleChangePicture,
    previewImage,
    handleChooseImage
  } = useProfileFormLogic();
  if (!currentUser) return <p>An Error has occurred while loading user data</p>

  return (
    <div className="profile-form">
      <div className="group">
        <div className="input">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" id="username" defaultValue={currentUser.username} />
        </div>
        <div className="input">
          <label htmlFor="email">Email Address</label>
          <input type="email" placeholder="Email Address" id="email" defaultValue={currentUser.email} />
        </div>
        <button onClick={handleUpdateUserInfo}>Save</button>
      </div>
      <div className="group">
        <div className="input">
          <label htmlFor="current-password">Current Password</label>
          <input type="password" placeholder="Current Password" id="current-password" />
        </div>
        <div className="input">
          <label htmlFor="new-password">New Password</label>
          <input type="password" placeholder="New Password" id="new-password" />
        </div>
        <button onClick={handleUpdateUserPassword}>Save</button>
      </div>
      <div className="group">
        <div className="picture">
          <img src={previewImage ? previewImage : currentUser.picture || DEFAULT_IMAGE} alt="" />
        </div>
        <div className="input">
          <label htmlFor="picture">Picture</label>
          <input type="file" id="picture" onChange={handleChooseImage} />
        </div>
        <button onClick={handleChangePicture}>Save</button>
      </div>
    </div>
  )
}

export default Form;