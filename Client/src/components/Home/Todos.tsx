import React, { useState, useEffect } from 'react';
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
  const PER_PAGE = 5;
  const [filters, setFilters] = useState<{ limit: number; skip: number; }>({ limit: PER_PAGE, skip: 0 });
  const [pagesCont, setPagesCont] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, data, fetchMore } = useQuery(GET_TODOS, { variables: { filters } });

  async function goToPage(pageToGo: number) {
    setCurrentPage(pageToGo);
    setFilters(prev => ({ ...prev, limit: PER_PAGE, skip: (pageToGo - 1) * PER_PAGE }));
  }

  async function reFetchMore() {
    await fetchMore({ variables: { filters } });
  }

  useEffect(() => {
    reFetchMore();
  }, [filters]);

  useEffect(() => {
    if (data) {
      setPagesCont(Math.ceil(data.todos.count / PER_PAGE));
    }
  }, [data]);



  return (
    <div className="todos">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {
        (!loading && !error) ?
          (data?.todos?.data?.length) ?
            data.todos.data.map((todo: TodoTypes.Todo) =>
              <Todo setIsEditMode={setIsEditMode} data={todo} key={todo._id} />
            )
            :
            <p className="no-todos">No TODOs Yet</p>
          :
          null
      }
      <div className="pagination">
        <button className="page-btn" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>&lt;&lt;</button>
        {
          new Array(pagesCont).fill(0).map((_, i) =>
            <button className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} key={i} onClick={() => goToPage(i + 1)}>{i + 1}</button>
          )
        }
        <button className="page-btn" disabled={currentPage === pagesCont} onClick={() => goToPage(currentPage + 1)}>&gt;&gt;</button>
      </div>
    </div>
  )
}

export default Todos