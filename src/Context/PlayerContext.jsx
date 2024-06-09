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
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
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
 // const seekSong = async(e) => {
   // audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.ofsetWidth)*audioRef.current.duration)

  //}
  useEffect(() => {
    const handleTimeUpdate = () => {
      seekBar.current.style.width = `${Math.floor(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      )}%`;
      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60)
        }
      });
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [audioRef]);

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
