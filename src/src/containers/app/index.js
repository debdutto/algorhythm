import React from "react";
import { Route, Link } from "react-router-dom";
import Fibonacci from "../fibonacci";
import NthSum from "../n-th-sum";

const App = () => (
  <div>
    <header>
      <Link to="/fibonacci">Fibonacci</Link>
      <span/>
      <Link to="/n-th-sum">NthSum</Link>
    </header>

    <main>
      <Route exact path="/" />
      <Route exact path="/fibonacci" component={Fibonacci} />
      <Route exact path="/n-th-sum" component={NthSum} />
    </main>
  </div>
);

export default App;
