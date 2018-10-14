import React from "react";
import { connect } from "react-redux";
import AudioPlayer from "../../elements/AudioPlayer";
import { SongList } from "../../modules/songs";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import piPlaces from "../pi/pi-places.json";
import Grid from "@material-ui/core/Grid";

const songStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh"
};

const numberStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "32vh",
  margin: "1vw",
  overflowX: "hidden"
};

const StyledButton = withStyles({
  root: {
    margin: "10px auto"
  }
})(Button);

class Songs extends React.Component {
  render() {
    return (
      <div>
        <div style={songStyles}>
          <Grid container spacing={16} alignItems="center" justify="center">
            {SongList.map(el => {
              let song = [el];
              return (
                <Grid item xs={3} key={el.url}>
                  <Grid item xs={12}>
                    <AudioPlayer songs={song} />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <StyledButton variant="contained" href={el.path}>
                      {"Go to " + el.artist.song}
                    </StyledButton>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div style={numberStyles}>
          <Grid item xs={12}>
            {piPlaces.pi}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

export default connect(mapStateToProps)(Songs);
