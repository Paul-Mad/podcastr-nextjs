import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from "./home.module.scss";

//SPA === Single Page Application
//SSR  === Server Side Rendering
//SSG  === Static Site Generation

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  //Consuming API data with SPA === Single Page Application

  // useEffect(() => {
  //   fetch(" http://localhost:3333/episodes")
  //     .then((res) => res.json())
  //     .then((data) => data);
  // }, []);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Latest Episodes</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  objectFit="cover"
                  src={episode.thumbnail}
                  alt={episode.title}
                />
                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button type="button">
                  <img src="/play-green.svg" alt="Play Episode" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>All Episodes</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Members</th>
              <th>Date</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 100 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Play Episode" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

//Consuming API data with SSR === Server Side Rendering
// data will be requested on the server, not on the browser
// export const getServerSideProps = async () => {
//   const res = await fetch(" http://localhost:3333/episodes");
//   const data = await res.json();

//   //return props to the "Home" component
//   return {
//     props: {
//       episodes: data,
//     },
//   };
// };

// Consuming API data with SSG === Static Site Generation
// data will be requested on the server, not on the browser
// just change the function name above to "getStaticProps", and use revalidate to set the time when the page will be reloaded.
export const getStaticProps: GetStaticProps = async () => {
  // AXIOS
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  // Format episode data from the API before it is sent to the component
  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy"),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(+episode.file.duration),
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  //return props to the "Home" component
  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
