import React, { Component, useState, useEffect, useRef } from 'react';

// SEE: A saparate function so that we can test it
const increment = (state, props) => {
  const { max, step } = props;
  if (state.count >= max) return;
  return { count: state.count + step };
};

const getItemFromLocalStorage = () => {
  let storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const useLocalStorage = (initialValue, key) => {
  let get = () => {
    let storage = localStorage.getItem(key);
    if (storage) return JSON.parse(storage).value;
    return initialValue;
  };

  let [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  });

  return [value, setValue];
};

const Counter = ({ max, step }) => {
  let [count, setCount] = useLocalStorage(0, 'count');
  let divRef = useRef(null);

  console.log('prevCount - ', divRef);
  console.log('currentCount - ', count);
  divRef.current = count;

  const increment = () => {
    setCount((prevCount) => {
      if (prevCount >= max) return prevCount;
      return prevCount + step;
    });
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  useEffect(() => {
    document.title = `Count - ${count}`;
  }, [count]);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button
          onClick={() => {
            increment();
          }}
        >
          Increment
        </button>
        <button
          onClick={() => {
            decrement();
          }}
        >
          Decrement
        </button>
        <button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </section>
    </div>
  );
};

export default Counter;
