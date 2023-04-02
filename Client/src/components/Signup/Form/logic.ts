//= Modules
import toast from "react-hot-toast";
//= Validators
import { SignupSchema } from './validation';
//= GraphQL Client
import client from '../../../graphql';
//= Query
import { GET_TODOS } from "../../../graphql/queries";
//= API
import api from '../../../helpers/axios';

export async function Signup(data: { username: string; email: string, password: string; }) {
  const validation_check = SignupSchema.safeParse(data);
  if (!validation_check.success) return toast.error(validation_check.error.issues.map((issue: any) => `${issue.path.join('.')}: ${issue.message}`).join(' -&- '));

  try {
    const res = await api.post('/auth/signup', data);
    toast.success(`Welcome ${data.username} in Todo App`);

    await client.refetchQueries({
      include: [GET_TODOS],
    });

    return res.data;
  } catch (err: any) {
    if (err.response?.data?.success === false) toast.error(err.response.data.message);
    else toast.error(err.message);
  }
}