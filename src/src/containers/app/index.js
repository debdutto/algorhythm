import React from "react";
import { Route, Link } from "react-router-dom";
import Fibonacci from "../fibonacci";

const App = () => (
  <div>
    <header>
      <Link to="/fibonacci">Fibonacci</Link>
    </header>

    <main>
      <Route exact path="/" />
      <Route exact path="/fibonacci" component={Fibonacci} />
    </main>
  </div>
);

export default App;
