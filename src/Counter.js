import React, { Component, useState, useEffect } from 'react';

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
    console.log('Inside Use Effect');
    let id = setInterval(() => {
      console.log('count - ', count);
    }, 2000);

    return () => {
      console.log('Clearing useEffect');
      clearInterval(id);
    };
  }, [count]);

  useEffect(() => {
    console.log('Inside Use Effect - 2');
    let id = setInterval(() => {
      console.log('count (2) - ', count);
    }, 2000);

    return () => {
      console.log('Clearing useEffect - 2');
      clearInterval(id);
    };
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
