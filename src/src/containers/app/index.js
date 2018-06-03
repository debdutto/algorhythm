import React from "react";
import { Route, Link } from "react-router-dom";
import Test2 from "../fibonacci";

const App = () => (
  <div>
    <header>
      <Link to="/fibonacci">Fibonacci</Link>
    </header>

    <main>
      <Route exact path="/" />
      <Route exact path="/fibonacci" component={Test2} />
    </main>
  </div>
);

export default App;
