import logo from "../logo.svg";
import "../App.css";

import Category from "./Category";
import Flashcard from "./Flashcard";
import Controls from "./Controls";

function App() {
  return (
    <div className="App">
      <Category />
      <Flashcard />
      <Controls />
    </div>
  );
}

export default App;
