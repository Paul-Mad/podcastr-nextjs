import { useRef, useEffect } from "react";
import Image from "next/image";
import { usePlayer } from "../../contexts/playersContext";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles.module.scss";

const Player = () => {
  //select the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  //get episode from context
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
  } = usePlayer();

  //Get the current episode
  const episode = episodeList[currentEpisodeIndex];

  //Execute when isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  //Return JSX element
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Playing Now" />
        <strong>Playing Now </strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Select a podcast to listen</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {/* Audio Element */}
        {episode && (
          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="shuffle" />
          </button>
          <button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt=" Play previous" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pause" />
            ) : (
              <img src="/play.svg" alt="Play" />
            )}
          </button>
          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Play next" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
};
export default Player;
