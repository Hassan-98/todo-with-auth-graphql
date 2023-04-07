import { gql } from '@apollo/client';

export const UPDATE_USER_DATA = gql`
  mutation Mutation($updateUserDataId: ID, $data: UpdateUserInput) {
    updateUserData(id: $updateUserDataId, data: $data) {
      _id
    }
  }
`;
