// COMPONENTS

import Header from "../components/Header/header.component";
import Player from "../components/player/player.component";
import { PlayerContextProvider } from "../contexts/playersContext";
//STYLES
import styles from "../styles/app.module.scss";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
