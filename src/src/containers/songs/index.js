import React from "react";
import AudioPlayer from "../../elements/AudioPlayer";
import { SongList } from "../../modules/songs";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const gridStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20vh auto"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10vh auto"
  }
};

const StyledButton = withStyles({
  root: {
    margin: "10px auto"
  }
})(Button);

class Songs extends React.Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={16} classes={classes}>
        {SongList.map(el => {
          let song = [el];
          return (
            <Grid item lg={3} md={6} key={el.url}>
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
    );
  }
}

export default withStyles(gridStyles)(Songs);
