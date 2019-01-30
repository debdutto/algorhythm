import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./AudioPlayer.css";

var _class, _temp;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var AudioPlayer = ((_temp = _class = (function(_PureComponent) {
  _inherits(AudioPlayer, _PureComponent);

  function AudioPlayer(props) {
    _classCallCheck(this, AudioPlayer);

    var _this = _possibleConstructorReturn(
      this,
      _PureComponent.call(this, props)
    );

    _this.shuffle = function(arr) {
      return arr.sort(function() {
        return Math.random() - 0.5;
      });
    };

    _this.updateProgress = function() {
      var _this$audio = _this.audio,
        duration = _this$audio.duration,
        currentTime = _this$audio.currentTime;

      var progress = (currentTime * 100) / duration;

      _this.setState({
        progress: progress
      });
    };

    _this.setProgress = function(e) {
      var target =
        e.target.nodeName === "SPAN" ? e.target.parentNode : e.target;
      var width = target.clientWidth;
      var rect = target.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var duration = _this.audio.duration;
      var currentTime = (duration * offsetX) / width;
      var progress = (currentTime * 100) / duration;

      _this.audio.currentTime = currentTime;

      _this.setState({
        progress: progress
      });

      _this.play();
    };

    _this.play = function() {
      _this.setState({
        playing: true
      });

      if (!_this.props.noPlay) {
        _this.audio.play();
      }

      _this.props.onPlay();
    };

    _this.pause = function() {
      _this.setState({
        playing: false
      });

      _this.audio.pause();

      _this.props.onPause();
    };

    _this.toggle = function() {
      return _this.state.playing ? _this.pause() : _this.play();
    };

    _this.next = function() {
      var _this$state = _this.state,
        repeat = _this$state.repeat,
        current = _this$state.current,
        songs = _this$state.songs;

      var total = songs.length;
      var newSongToPlay = repeat
        ? current
        : current < total - 1
          ? current + 1
          : 0;
      var active = songs[newSongToPlay];

      _this.setState({
        current: newSongToPlay,
        active: active,
        progress: 0,
        repeat: false
      });

      _this.audio.src = active.url;
      _this.play();
      _this.props.onNext();
    };

    _this.previous = function() {
      var _this$state2 = _this.state,
        current = _this$state2.current,
        songs = _this$state2.songs;

      var total = songs.length;
      var newSongToPlay = current > 0 ? current - 1 : total - 1;
      var active = songs[newSongToPlay];

      _this.setState({
        current: newSongToPlay,
        active: active,
        progress: 0
      });

      _this.audio.src = active.url;
      _this.play();
      _this.props.onPrevious();
    };

    _this.randomize = function() {
      var _this$state3 = _this.state,
        random = _this$state3.random,
        songs = _this$state3.songs;

      var shuffled = _this.shuffle(songs.slice());

      _this.setState({
        songs: !random ? shuffled : songs,
        random: !random
      });
    };

    _this.repeat = function() {
      return _this.setState({
        repeat: !_this.state.repeat
      });
    };

    _this.toggleMute = function() {
      var mute = _this.state.mute;

      _this.setState({
        mute: !mute
      });

      _this.audio.volume = !!mute;
    };

    _this.state = {
      active: props.songs[0],
      songs: props.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!props.autoplay,
      repeat: false,
      mute: false
    };

    _this.audio = document.createElement("audio");
    _this.audio.src = _this.state.active.url;
    _this.audio.autoplay = !!_this.state.autoplay;

    _this.audio.addEventListener("timeupdate", function(e) {
      _this.updateProgress();

      props.onTimeUpdate(e);
    });
    _this.audio.addEventListener("ended", function(e) {
      _this.next();

      props.onEnded(e);
    });
    _this.audio.addEventListener("error", function(e) {
      _this.next();

      props.onError(e);
    });
    return _this;
  }

  AudioPlayer.prototype.componentWillReceiveProps = function componentWillReceiveProps(
    nextProps
  ) {
    this.setState({
      active: nextProps.songs[0],
      songs: nextProps.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!nextProps.autoplay,
      repeat: false,
      mute: false
    });
  };

  AudioPlayer.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state,
      currentSong = _state.active,
      progress = _state.progress,
      active = _state.active,
      playing = _state.playing,
      mute = _state.mute,
      random = _state.random,
      repeat = _state.repeat;

    var coverClass = classnames({
      "player-cover": true,
      "no-height": !!active.cover === false
    });

    var playPauseClass = classnames({
      fa: true,
      "fa-play": !playing,
      "fa-pause": playing
    });

    var volumeClass = classnames({
      fa: true,
      "fa-volume-up": !mute,
      "fa-volume-off": mute
    });

    var randomClass = classnames({
      "player-btn small random": true,
      active: random
    });

    var repeatClass = classnames({
      "player-btn small repeat": true,
      active: repeat
    });

    return React.createElement(
      "div",
      { className: "player-container" },
      React.createElement("div", {
        className: coverClass,
        style: { backgroundImage: "url(" + (currentSong.cover || "") + ")" }
      }),
      React.createElement(
        "div",
        { className: "artist-info" },
        React.createElement(
          "h3",
          { className: "artist-song-name" },
          currentSong.artist.song
        )
      ),
      React.createElement(
        "div",
        {
          className: "player-progress-container",
          onClick: function onClick(e) {
            return _this2.setProgress(e);
          }
        },
        React.createElement("span", {
          className: "player-progress-value",
          style: { width: progress + "%" }
        })
      ),
      React.createElement(
        "div",
        { className: "player-options" },
        React.createElement(
          "div",
          { className: "player-buttons player-controls" },
          React.createElement(
            "button",
            {
              onClick: this.toggle,
              className: "player-btn big",
              title: "Play/Pause"
            },
            React.createElement("i", { className: playPauseClass })
          ),
          // React.createElement(
          //   "button",
          //   {
          //     onClick: this.previous,
          //     className: "player-btn medium",
          //     title: "Previous Song"
          //   },
          //   React.createElement("i", { className: "fa fa-forward" })
          // ),
          // React.createElement(
          //   "button",
          //   {
          //     onClick: this.next,
          //     className: "player-btn medium",
          //     title: "Next Song"
          //   },
          //   React.createElement("i", { className: "fa fa-forward" })
          // )
        ),
        // React.createElement(
        //   "div",
        //   { className: "player-buttons play-controls" },
        //   React.createElement(
        //     "button",
        //     {
        //       className: "player-btn small volume",
        //       onClick: this.toggleMute,
        //       title: "Mute/Unmute"
        //     },
        //     React.createElement("i", { className: volumeClass })
        //   ),
        //   React.createElement(
        //     "button",
        //     {
        //       className: repeatClass,
        //       onClick: this.repeat,
        //       title: "Repeat"
        //     },
        //     React.createElement("i", { className: "fa fa-repeat" })
        //   ),
        //   React.createElement(
        //     "button",
        //     {
        //       className: randomClass,
        //       onClick: this.randomize,
        //       title: "Shuffle"
        //     },
        //     React.createElement("i", { className: "fa fa-random" })
        //   )
        // )
      )
    );
  };

  return AudioPlayer;
})(PureComponent)),
(_class.defaultProps = {
  onTimeUpdate: function onTimeUpdate() {},
  onEnded: function onEnded() {},
  onError: function onError() {},
  onPlay: function onPlay() {},
  onPause: function onPause() {},
  onPrevious: function onPrevious() {},
  onNext: function onNext() {},
  noPlay: false
}),
_temp);
AudioPlayer.propTypes =
  process.env.NODE_ENV !== "production"
    ? {
        songs: PropTypes.array.isRequired,
        autoplay: PropTypes.bool,
        onTimeUpdate: PropTypes.func,
        onEnded: PropTypes.func,
        onError: PropTypes.func,
        onPlay: PropTypes.func,
        onPause: PropTypes.func,
        onPrevious: PropTypes.func,
        onNext: PropTypes.func,
        noPlay: PropTypes.bool
      }
    : {};

export default AudioPlayer;
