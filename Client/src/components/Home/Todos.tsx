import React from 'react';
//= Modules
import { useQuery } from '@apollo/client';
//= Queries
import { GET_TODOS } from '../../graphql/queries';
//= Components
import Todo from './Todo';
//= Types
import { TodoTypes } from '../../types';
//= Styles
import './todos.css';

interface IProps {
  setIsEditMode: React.Dispatch<React.SetStateAction<TodoTypes.Todo | false>>
}

function Todos({ setIsEditMode }: IProps) {
  const { loading, error, data } = useQuery(GET_TODOS);

  return (
    <div className="todos">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {
        data?.todos?.length ?
          data?.todos.map((todo: TodoTypes.Todo) => (
            <Todo setIsEditMode={setIsEditMode} data={todo} key={todo._id} />
          ))
          :
          <p className="no-todos">No TODOs Yet</p>
      }
    </div>
  )
}

export default Todos