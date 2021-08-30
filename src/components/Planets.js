import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

function Planets() {
  const [page, setPage] = useState(1);

  const fetchPlanets = (page = 1) => fetch(`https://swapi.dev/api/planets/?page=${page}`).then((res) => res.json());

  const { isLoading, isError, error, data, isPreviousData } = useQuery(['planets', page], () => fetchPlanets(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>Planets</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}

      <div className='paginationDiv'>
        <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
          previous page
        </button>
        <span>{page}</span>
        <button
          onClick={() => {
            if (!isPreviousData && data.next) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.next}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Planets;
