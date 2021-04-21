import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

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
  description: string;
  url: string;
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  //Consuming API data with SPA === Single Page Application

  // useEffect(() => {
  //   fetch(" http://localhost:3333/episodes")
  //     .then((res) => res.json())
  //     .then((data) => data);
  // }, []);

  return (
    <div>
      <h1>index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
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
      description: episode.description,
      url: episode.file.url,
    };
  });

  //return props to the "Home" component
  return {
    props: {
      episodes: episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
