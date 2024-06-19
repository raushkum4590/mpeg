
import React, { createContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../assets/assets';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    setTrack(songsData[id]);
    audioRef.current.load();
    audioRef.current.addEventListener('loadeddata', () => {
      audioRef.current.play();
      setPlayStatus(true);
    }, { once: true });
  };

  const previous = async () => {
    if (track.id > 0) {
      const newTrack = songsData[track.id - 1];
      setTrack(newTrack);
      audioRef.current.load();
      audioRef.current.addEventListener('loadeddata', () => {
        audioRef.current.play();
        setPlayStatus(true);
      }, { once: true });
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      const newTrack = songsData[track.id + 1];
      setTrack(newTrack);
      audioRef.current.load();
      audioRef.current.addEventListener('loadeddata', () => {
        audioRef.current.play();
        setPlayStatus(true);
      }, { once: true });
    }
  };

  const seekSong = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const width = seekBg.current.offsetWidth;
    const duration = audioRef.current.duration;

    if (!isNaN(duration)) {
      const newTime = (offsetX / width) * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;

        seekBar.current.style.width = `${Math.floor(
          (currentTime / duration) * 100
        )}%`;

        setTime({
          currentTime: {
            second: Math.floor(currentTime % 60),
            minute: Math.floor(currentTime / 60)
          },
          totalTime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60)
          }
        });
      }
    };

    const handleEnded = () => {
      next();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [next]);

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
    pause,
    play,
    playWithId,
    previous,
    next,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
