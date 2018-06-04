import React from "react";
import { Route, Link } from "react-router-dom";
import Fibonacci from "../fibonacci";
import NthSum from "../n-th-sum";
import Pi from "../pi";

const App = () => (
  <div>
    <header>
      <Link to="/fibonacci">Fibonacci</Link>
      <Link to="/n-th-sum">NthSum</Link>
      <Link to="/pi">Pi</Link>
    </header>

    <main>
      <Route exact path="/" />
      <Route exact path="/fibonacci" component={Fibonacci} />
      <Route exact path="/n-th-sum" component={NthSum} />
      <Route exact path="/pi" component={Pi} />
    </main>
  </div>
);

export default App;
