//= Router
import { redirect } from "react-router-dom";
//= Axios
import axios from "../helpers/axios";
//= GraphQL
import client from "../graphql";
//= Queries
import { GET_CURRENT_USER } from "../graphql/queries";

async function getCurrentUserRequest() {
  return await axios.post("/graphql", {
    query: `
      query GetCurrentUser {
        currentUser {
          _id
          username
          email
          picture
        }
      }
    `
  },
    {
      headers: { 'x-apollo-operation-name': 'GetCurrentUser' }
    }
  );
}

export async function shouldBeAuthenticated() {
  try {
    const res = await getCurrentUserRequest();
    if (!res.data.data.currentUser) return redirect('/login');

    client.writeQuery({
      query: GET_CURRENT_USER,
      data: res.data.data
    });

    return res.data.data.currentUser;
  } catch (e: any) {
    return redirect('/login');
  }
}

export async function shouldNotBeAuthenticated() {
  try {
    const res = await getCurrentUserRequest();
    if (res.data.data.currentUser) return redirect('/');
    return null;
  } catch (e: any) {
    return null;
  }
}