import { useContext } from "react";
import { PlayerContext } from "../../contexts/playersContext";
import styles from "./styles.module.scss";

const Player = () => {
  //get episode from context
  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);

  //Get the current episode
  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Playing Now" />
        <strong>Playing Now {episode?.title}</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Select a podcast to listen</strong>
      </div>
      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="shuffle" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt=" Play previous" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="Play" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Play next" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
};
export default Player;
