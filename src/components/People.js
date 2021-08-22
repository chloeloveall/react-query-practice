import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import Person from './Person';

function People() {
  const [page, setPage] = useState(1);
  const fetchPeople = async (key, page) => {
    const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    return res.json();
  };

  // first argument is a key for the query
  // second argument is an async function to fetch the data
  const { resolvedData, latestData, status } = usePaginatedQuery(['people', page], fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <div>Loading data</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <div>
            {resolvedData.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>

          <div className='paginationDiv'>
            <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
              previous page
            </button>
            <span>{page}</span>
            <button
              onClick={() => setPage((old) => (!latestData || !latestData.next ? old : old + 1))}
              disabled={!latestData || !latestData.next}
            >
              next page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default People;
