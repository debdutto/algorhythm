import React from "react";
import { Route, Link } from "react-router-dom";
import Test2 from "../Fibonacci";

const App = () => (
  <div>
    <header>
      <Link to="/Fibonacci">Fibonacci</Link>
    </header>

    <main>
      <Route exact path="/" />
      <Route exact path="/Fibonacci" component={Test2} />
    </main>
  </div>
);

export default App;
