import React from "react";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Songs from "../containers/songs";
import Fibonacci from "../containers/fibonacci";
import NthSum from "../containers/n-th-sum";
import Pi from "../containers/pi";
import CrimesAgainstWomen from "../containers/crimes-against-women";
import SuicideRates from "../containers/suicide-rates";
import LiteracyRates from "../containers/literacy-rate";
import AirQuality from "../containers/air-quality";

const App = () => (
  <Grid container spacing={16}>
    <Route exact path="/" component={Songs} />
    <Route exact path="/fibonacci" component={Fibonacci} />
    <Route exact path="/n-th-sum" component={NthSum} />
    <Route exact path="/pi" component={Pi} />
    <Route exact path="/crimes-against-women" component={CrimesAgainstWomen} />
    <Route exact path="/suicide-rates" component={SuicideRates} />
    <Route exact path="/literacy-rates" component={LiteracyRates} />
    <Route exact path="/air-quality" component={AirQuality} />
  </Grid>
);

export default App;
