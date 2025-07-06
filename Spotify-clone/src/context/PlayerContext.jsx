import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minute: 0, second: "00" },
    totalTime: { minute: 0, second: "00" },
  });

  const formatTime = (seconds) => {
    const minute = Math.floor(seconds / 60) || 0;
    const second = String(Math.floor(seconds % 60) || 0).padStart(2, "0");
    return { minute, second };
  };

  const play = () => {
    if (audioRef.current && track?.file) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    const song = songsData.find((song) => song._id === id);
    if (song) {
      setTrack(song);
      setPlayStatus(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    }
  };

  const previous = async () => {
    const currentIndex = songsData.findIndex((s) => s._id === track?._id);
    if (currentIndex > 0) {
      const prevSong = songsData[currentIndex - 1];
      setTrack(prevSong);
      setPlayStatus(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    }
  };

  const next = async () => {
    const currentIndex = songsData.findIndex((s) => s._id === track?._id);
    if (currentIndex >= 0 && currentIndex < songsData.length - 1) {
      const nextSong = songsData[currentIndex + 1];
      setTrack(nextSong);
      setPlayStatus(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    }
  };

  const seekSong = (e) => {
    const seekTo =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = seekTo;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      const songs = response.data.songs || [];
      setSongsData(songs);
      if (songs.length > 0) setTrack(songs[0]);
    } catch (error) {
      console.error("Failed to fetch songs");
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums || []);
    } catch (error) {
      console.error("Failed to fetch albums");
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      if (!audioRef.current) return;

      audioRef.current.ontimeupdate = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 0;

        const progress = (current / duration) * 100;
        if (seekBar.current) {
          seekBar.current.style.width = `${progress}%`;
        }

        setTime({
          currentTime: formatTime(current),
          totalTime: formatTime(duration),
        });
      };
    }, 1000);

    return () => clearTimeout(interval);
  }, [audioRef]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      {track?.file && (
        <audio
          ref={audioRef}
          src={track.file}
          onEnded={() => setPlayStatus(false)}
        />
      )}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
