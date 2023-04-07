import { useState, useEffect } from 'react';
//= Modules
import { useQuery } from '@apollo/client';
//= Queries
import { GET_TODOS } from '../../../graphql/queries';

function useTodosLogic() {
  const PER_PAGE = 5;
  const [filters, setFilters] = useState<{ limit: number; skip: number; }>({ limit: PER_PAGE, skip: 0 });
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, data, fetchMore } = useQuery(GET_TODOS, { variables: { filters }, ssr: true });

  async function goToPage(pageToGo: number) {
    setCurrentPage(pageToGo);
    setFilters(prev => ({ ...prev, limit: PER_PAGE, skip: (pageToGo - 1) * PER_PAGE }));
  }

  function goToNextPage() {
    goToPage(currentPage + 1);
  }

  function goToPrevPage() {
    goToPage(currentPage - 1);
  }

  async function reFetchMore() {
    await fetchMore({ variables: { filters } });
  }

  useEffect(() => {
    reFetchMore();
  }, [filters]);

  useEffect(() => {
    if (data) setPagesCount(Math.ceil(data.todos.count / PER_PAGE));
  }, [data]);

  return {
    pagesCount,
    currentPage,
    loading,
    error,
    todos: data?.todos?.data,
    goToPage,
    goToNextPage,
    goToPrevPage
  }
}

export default useTodosLogic