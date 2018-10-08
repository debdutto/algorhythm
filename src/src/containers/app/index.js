import React from "react";
import { Route, Link } from "react-router-dom";
import Fibonacci from "../fibonacci";
import NthSum from "../n-th-sum";
import Pi from "../pi";
import CrimesAgainstWomen from "../crimes-against-women";
import SuicideRates from "../suicide-rates";
import LiteracyRates from "../literacy-rate";

const App = () => (
  <div>
    <header>
      <Link to="/fibonacci">Fibonacci </Link>
      <Link to="/n-th-sum">NthSum </Link>
      <Link to="/pi">Pi </Link>
      <Link to="/crimes-against-women">Crimes Against Women</Link>
      <Link to="/suicide-rates">Suicide Rates</Link>
      <Link to="/literacy-rates">Literacy Rates</Link>
    </header>

    <main>
      <Route exact path="/" />
      <Route exact path="/fibonacci" component={Fibonacci} />
      <Route exact path="/n-th-sum" component={NthSum} />
      <Route exact path="/pi" component={Pi} />
      <Route
        exact
        path="/crimes-against-women"
        component={CrimesAgainstWomen}
      />
      <Route exact path="/suicide-rates" component={SuicideRates} />
      <Route exact path="/literacy-rates" component={LiteracyRates} />
    </main>
  </div>
);

export default App;
