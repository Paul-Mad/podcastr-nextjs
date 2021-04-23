import { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider = (props: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //Play Current Episode
  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };
  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = currentEpisodeIndex + 1 < episodeList.length;

  const playNext = () => {
    if (hasNext) setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  };

  const playPrevious = () => {
    if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state);
  };

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasPrevious,
        hasNext,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
