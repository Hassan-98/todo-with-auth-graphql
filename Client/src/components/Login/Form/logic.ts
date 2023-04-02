//= Modules
import toast from "react-hot-toast";
//= Validators
import { LoginSchema } from './validation';
//= GraphQL Client
import client from '../../../graphql';
//= Query
import { GET_TODOS } from "../../../graphql/queries";
//= API
import api from '../../../helpers/axios';

export async function Login({ email, password }: { email: string, password: string; }) {
  const data = { email, password };

  const validation_check = LoginSchema.safeParse(data);
  if (!validation_check.success) return toast.error(validation_check.error.issues.map((issue: any) => `${issue.path.join('.')}: ${issue.message}`).join(' -&- '));

  try {
    const res = await api.post('/auth/login', data);
    toast.success('Logged in successfully');

    await client.refetchQueries({
      include: [GET_TODOS],
    });

    return res.data;
  } catch (err: any) {
    if (err.response?.data?.success === false) toast.error(err.response.data.message);
    else toast.error(err.message);
  }
}