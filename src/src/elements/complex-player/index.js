import React from "react";
import { StyledButton, CardStyles } from "../../styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default (playParams, classes, headlineText) => {
  let startBinded = playParams.startMusic.bind({}, playParams);
  let stopBinded = playParams.stopMusic.bind({}, playParams);
  return (
    <Grid
      container
      spacing={16}
      justify="center"
      alignItems="center"
      classes={classes}
    >
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item lg={2} md={2} style={{ textAlign: "center" }}>
          <Card classes={CardStyles.card}>
            <Link
              target="_blank"
              to="https://joyc.bandcamp.com/album/india-in-b-major"
              style={{ textDecorationLine: "none" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="India in B Major"
                  // className={cardStyles.media}
                  // height="100"
                  image="cover_sketch_small.jpg"
                  title="India in B Major"
                />
              </CardActionArea>
            </Link>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {headlineText}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
          <StyledButton onClick={startBinded} variant="contained" size="large">
            Start
          </StyledButton>
        </Grid>
        <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
          <StyledButton onClick={stopBinded} variant="contained" size="large">
            Stop
          </StyledButton>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={8}
        justify="center"
        alignItems="center"
        classes={classes}
      >
        <Grid
          item
          lg={12}
          md={2}
          style={{ textAlign: "center", color: "#FFF" }}
        >
          <label>If you wish to see the data or checkout the repo</label>
        </Grid>
        <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
          <Link
            target="_blank"
            to="https://github.com/debdutto/algorhythm"
            style={{ textDecorationLine: "none" }}
          >
            <StyledButton variant="contained" size="large" color="primary">
              Github
            </StyledButton>
          </Link>
        </Grid>
        <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
          <Link
            target="_blank"
            to="mailto:debduttoc@gmail.com"
            style={{ textDecorationLine: "none" }}
          >
            <StyledButton variant="contained" size="large" color="primary">
              Email
            </StyledButton>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
