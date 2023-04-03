import React from 'react';
//= Logic
import useTodosLogic from './logic';
//= Components
import Todo from './Todo';
//= Types
import { TodoTypes } from '../../../types';
//= Styles
import './todos.css';

interface IProps {
  setIsEditMode: React.Dispatch<React.SetStateAction<TodoTypes.Todo | false>>
}

function Todos({ setIsEditMode }: IProps) {
  const {
    loading,
    error,
    todos,
    pagesCount,
    currentPage,
    goToPage,
    goToNextPage,
    goToPrevPage
  } = useTodosLogic();

  return (
    <div className="todos">
      {loading && <div className="loading" />}
      {error && <p>{error.message}</p>}
      {
        todos?.length ? todos.map((todo: TodoTypes.Todo) =>
          <Todo setIsEditMode={setIsEditMode} data={todo} key={todo._id} />
        ) : null
      }
      {
        !loading && !loading && !todos?.length &&
        <p className="no-todos">No TODOs Yet</p>
      }
      {
        todos?.length ?
          <div className="pagination">
            <button className="page-btn" disabled={currentPage === 1} onClick={goToPrevPage}>&lt;&lt;</button>
            {new Array(pagesCount).fill(0).map((_, i) =>
              <button className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} key={i} onClick={() => goToPage(i + 1)}>{i + 1}</button>
            )}
            <button className="page-btn" disabled={currentPage === pagesCount} onClick={goToNextPage}>&gt;&gt;</button>
          </div> : null
      }
    </div>
  )
}

export default Todos