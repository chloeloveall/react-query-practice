import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

function Planets() {
  const [page, setPage] = useState(1)

  const fetchPlanets = async (key, greeting, page) => {
    console.log(greeting);
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
  }

  // first argument is a key for the query 
  // second argument is an async function to fetch the data
  const { data, status } = useQuery(['planets', 'hello, ninjas', page], fetchPlanets, {
    staleTime: 2000,
    // cacheTime: 10,
    onSuccess: () => console.log('data has been fetched successfully'),
  });
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && (
        <div>Loading data</div>
      )}
      {status === 'error' && (
        <div>Error fetching data</div>
      )}
      {status === 'success' && (
        <div>
          { data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
        </div>
      )}

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>
      <button onClick={() => setPage(4)}>page 4</button>
      <button onClick={() => setPage(5)}>page 5</button>
      <button onClick={() => setPage(6)}>page 6</button>
    </div>
  );
}

export default Planets;
