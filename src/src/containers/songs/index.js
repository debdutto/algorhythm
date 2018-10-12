import React from "react";
import { connect } from "react-redux";
import AudioPlayer from "../../elements/AudioPlayer";
import { SongList } from "../../modules/songs";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const songStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh"
};

class Songs extends React.Component {
  render() {
    return (
      <div style={songStyles}>
        <Grid container spacing={24} key="songContainer">
          {SongList.map(el => {
            let song = [el];
            return (
              <Grid item xs={3} key={el.url}>
                <AudioPlayer songs={song} />
              </Grid>
            );
          })}
        </Grid>
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
