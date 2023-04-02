//= Router
import { redirect } from "react-router-dom";
//= Axios
import axios from "../helpers/axios";

async function getCurrentUserRequest() {
  return await axios.post("/graphql", {
    query: `
      query GetCurrentUser {
        currentUser {
          _id
          username
        }
      }
    `
  },
    {
      headers: {
        'x-apollo-operation-name': 'GetCurrentUser'
      }
    });
}

export async function shouldBeAuthenticated() {
  try {
    const res = await getCurrentUserRequest();
    if (!res.data.data.currentUser) return redirect('/login');
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