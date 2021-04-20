import { useEffect } from "react";

//SPA === Single Page Application
//SSR  === Server Side Rendering
//SSG  === Static Site Generation

export default function Home(props) {
  //Consuming API data with SPA === Single Page Application

  // useEffect(() => {
  //   fetch(" http://localhost:3333/episodes")
  //     .then((res) => res.json())
  //     .then((data) => data);
  // }, []);

  return <h1>index</h1>;
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

export const getStaticProps = async () => {
  const res = await fetch(" http://localhost:3333/episodes");
  const data = await res.json();

  //return props to the "Home" component
  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
