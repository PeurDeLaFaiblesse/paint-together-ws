import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>increase</button>
    </div>
  );
};
