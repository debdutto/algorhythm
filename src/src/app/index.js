import React from "react";
import { Route, Link } from "react-router-dom";
import Songs from "../containers/songs";
import Fibonacci from "../containers/fibonacci";
import NthSum from "../containers/n-th-sum";
import Pi from "../containers/pi";
import CrimesAgainstWomen from "../containers/crimes-against-women";
import SuicideRates from "../containers/suicide-rates";
import LiteracyRates from "../containers/literacy-rate";
import AirQuality from "../containers/air-quality";

const App = () => (
  <div>
    <header>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
      />
      {/* <Link to="/crimes-against-women">Crimes Against Women</Link>
      <Link to="/suicide-rates">Suicide Rates</Link>
      <Link to="/literacy-rates">Literacy Rates</Link>
      <Link to="/air-quality">Air Quality</Link>
      <Link to="/fibonacci">Fibonacci </Link>
      <Link to="/n-th-sum">NthSum </Link>
      <Link to="/pi">Pi </Link> */}
      <Songs />
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
      <Route exact path="/air-quality" component={AirQuality} />
    </main>
  </div>
);

export default App;
