import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AudioPlayer from "react-cl-audio-player";
import { PiSong } from "../../modules/songs";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../modules/counter";

const songStyles = {
  width: "33vw",
  float: "left"
};

class Songs extends React.Component {
  render() {
    return (
      <div>
        <div style={songStyles}>
          <AudioPlayer songs={PiSong} />
        </div>
        <div style={songStyles}>
          <AudioPlayer songs={PiSong} />
        </div>
        <div style={songStyles}>
          <AudioPlayer songs={PiSong} />
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push("/about-us")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Songs);
