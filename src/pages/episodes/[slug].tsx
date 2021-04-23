import { format, parseISO } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePlayer } from "../../contexts/playersContext";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

import styles from "./episode.module.scss";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  description: string;
  durationAsString: string;
  url: string;
};

type EpisodeProps = {
  episode: Episode;
};

const Episode = ({ episode }: EpisodeProps) => {
  const { play } = usePlayer();

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Back" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Play Episode" />
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // AXIOS - Get episodes
  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  // Get episodes slug paths to generate the static
  const paths = data.map((episode) => {
    return { params: { slug: episode.id } };
  });

  console.log(data);
  return {
    paths,

    // Incremental static regeneration
    fallback: "blocking",
  };
};

// Consuming API data with SSG === Static Site Generation
export const getStaticProps: GetStaticProps = async (ctx) => {
  //get the slug value
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy"),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(+data.file.duration),
    description: data.description,
    url: data.file.url,
  };
  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Episode;
