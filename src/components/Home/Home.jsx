import { useContext } from "react";
import { CounterContext } from "../../Context/CounterContext";

function Home() {
  let { counter, increaseCounter } = useContext(CounterContext)

  return <>
    <h2>Home</h2>
    {console.log(counter)}
    {counter}
    <input type="submit" className="bg-main" onClick={() => increaseCounter()} />

  </>;
}

export default Home;
