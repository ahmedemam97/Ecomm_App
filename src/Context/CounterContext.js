import { createContext, useState } from "react";

export let CounterContext = createContext();
export default function CounterContextProvider(props) {
  let [counter, setCounter] = useState(0);
  function increaseCounter() {
    setCounter(counter + 1);
  }
  return (
    <CounterContext.Provider value={{ counter, increaseCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
