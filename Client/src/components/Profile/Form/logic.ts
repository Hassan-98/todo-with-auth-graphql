import React, { useState } from 'react';
//= Modules
import { toast } from 'react-hot-toast';
import { useQuery, useMutation } from '@apollo/client';
//= Validation Schema
import { userInfoSchema, userPasswordSchema } from './form.validation';
//= Queries
import { UPDATE_USER_DATA, GET_CURRENT_USER } from '../../../graphql/queries';
//= Types
import { UserTypes } from '../../../types';

function useProfileFormLogic() {
  const [updateUserData] = useMutation(UPDATE_USER_DATA);
  const { data: currentUserData } = useQuery(GET_CURRENT_USER);
  const [previewImage, setPreviewImage] = useState<string>(currentUserData.currentUser.picture || '');

  const { currentUser }: { currentUser: UserTypes.User } = currentUserData;

  async function handleUpdateUserInfo() {
    const username = document.querySelector<HTMLInputElement>('.profile-form #username')!.value;
    const email = document.querySelector<HTMLInputElement>('.profile-form #email')!.value;
    const data = { username, email };

    const validation_check = userInfoSchema.safeParse(data);
    if (!validation_check.success) {
      toast.error(validation_check.error.issues.map((issue: any) => `- ${issue.path.join('.')} ${issue.message}`).join(' \n '));
      return false;
    }

    try {
      const result = await updateUserData({
        variables: {
          updateUserDataId: currentUser._id,
          data
        },
        refetchQueries: [GET_CURRENT_USER]
      });

      if (result.errors) throw new Error(result.errors[0].message);
      toast.success(`User data updated successfully`);
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  }

  async function handleUpdateUserPassword() {
    const currentPassword = document.querySelector<HTMLInputElement>('.profile-form #current-password')!.value;
    const newPassword = document.querySelector<HTMLInputElement>('.profile-form #new-password')!.value;
    const data = { currentPassword, newPassword };

    const validation_check = userPasswordSchema.safeParse(data);
    if (!validation_check.success) {
      toast.error(validation_check.error.issues.map((issue: any) => `- ${issue.path.join('.')} ${issue.message}`).join(' \n '));
      return false;
    }

    try {
      const result = await updateUserData({
        variables: {
          updateUserDataId: currentUser._id,
          data
        }
      });

      if (result.errors) throw new Error(result.errors[0].message);
      toast.success(`User password updated successfully`);
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  }

  function handleChooseImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) return;
    const image = event.currentTarget.files[0];

    var reader = new FileReader();
    reader.onload = function (event: any) {
      setPreviewImage(event.target.result)
    };
    reader.readAsDataURL(image);
  }

  async function handleChangePicture() {
    const inputValue = document.querySelector<HTMLInputElement>('.profile-form #picture')!.files;

    if (!inputValue || !inputValue.length) {
      toast.error(`Please select a picture`);
      return false;
    }

    const picture = inputValue[0];

    try {
      const result = await updateUserData({
        variables: {
          updateUserDataId: currentUser._id,
          data: {
            picture
          },
          refetchQueries: [GET_CURRENT_USER]
        }
      });

      if (result.errors) throw new Error(result.errors[0].message);
      toast.success(`User picture updated successfully`);
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  }

  return {
    previewImage,
    currentUser,
    handleUpdateUserInfo,
    handleUpdateUserPassword,
    handleChooseImage,
    handleChangePicture
  }
}

export default useProfileFormLogic