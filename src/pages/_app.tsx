// COMPONENTS
import { useState } from "react";
import Header from "../components/Header/header.component";
import Player from "../components/player/player.component";
import { PlayerContext } from "../contexts/playersContext";

//STYLES
import styles from "../styles/app.module.scss";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const play = (episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  };

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
