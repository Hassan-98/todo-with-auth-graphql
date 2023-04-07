//= Modules
import { z } from "zod";
import toast from "react-hot-toast";
//= Validators
import { TodoSchema, UpdateTodoSchema } from './validation';
//= Queries
import { GET_TODOS } from "../../../graphql/queries";

export async function AddTodo(mutation: Function, data: z.infer<typeof TodoSchema>) {
  const validation_check = TodoSchema.safeParse(data);
  if (!validation_check.success) {
    toast.error(validation_check.error.issues.map((issue: any) => `${issue.path.join('.')}: ${issue.message}`).join(' -&- '));
    return false;
  }

  try {
    const result = await mutation({
      variables: {
        data: {
          content: data.content,
          user: data.author
        }
      },
      refetchQueries: [GET_TODOS]
    });

    if (result.errors) return toast.error(result.errors[0].message);
    toast.success(`Todo item added successfully`);
    document.querySelector<HTMLInputElement>('#todo-input')!.value = "";
    return true;
  } catch (err: any) {
    toast.error(err.message);
    return false;
  }
}

export async function EditTodo(mutation: Function, data: z.infer<typeof UpdateTodoSchema>) {
  const validation_check = UpdateTodoSchema.safeParse(data);
  if (!validation_check.success) {
    toast.error(validation_check.error.issues.map((issue: any) => `${issue.path.join('.')}: ${issue.message}`).join(' -&- '));
    return false;
  }

  try {
    const result = await mutation({
      variables: {
        data: {
          content: data.content
        },
        updateTodoId: data._id,
      }
    });

    if (result.errors) return toast.error(result.errors[0].message);
    toast.success(`Todo item updated successfully`);
    document.querySelector<HTMLInputElement>('#todo-input')!.value = "";
    return true;
  } catch (err: any) {
    toast.error(err.message);
    return false;
  }
}