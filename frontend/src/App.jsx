import "./App.css";
import { Button } from "./components/Button/Button";

function App() {
  const handleClick = () => {
    console.log("hello");
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline text-amber-100">
        Hello world!
      </h1>
    </>
  );
}

export default App;
