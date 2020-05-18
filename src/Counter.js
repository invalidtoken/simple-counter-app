import React, { Component } from 'react';

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

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getItemFromLocalStorage();
  }

  increment() {
    // SEE: If the step prop is 4 the output of all the functions are 20
    this.setState(increment, () => {
      console.log(this.state.count); // 20
    });

    this.setState(increment, () => {
      console.log(this.state.count); // 20
    });

    this.setState(increment, () => {
      console.log(this.state.count); // 20

      // Setting up local storage
      localStorage.setItem('counterState', JSON.stringify(this.state));
      document.title = `Count - ${this.state.count}`;
    });
  }

  decrement() {
    this.setState(
      (state) => ({ count: state.count - 1 }),
      () => {
        document.title = `Count - ${this.state.count}`;
      },
    );
  }

  reset() {
    this.setState({ count: 0 }, () => {
      document.title = `Count - ${this.state.count}`;
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log('count - ', this.state.count);
    }, 3000);
  }

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button
            onClick={() => {
              this.increment();
            }}
          >
            Increment
          </button>
          <button
            onClick={() => {
              this.decrement();
            }}
          >
            Decrement
          </button>
          <button
            onClick={() => {
              this.reset();
            }}
          >
            Reset
          </button>
        </section>
      </div>
    );
  }
}

export default Counter;
