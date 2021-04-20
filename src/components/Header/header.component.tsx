import format from "date-fns/format";

import styles from "./styles.module.scss";

const Header = () => {
  const currentDate = format(new Date(), "EEEEEE, d MMMM");
  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr"></img>
      <p>The best for you, always</p>

      <span>{currentDate}</span>
    </header>
  );
};
export default Header;
