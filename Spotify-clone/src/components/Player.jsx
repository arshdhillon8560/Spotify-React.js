import React, { useContext, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { Volume, VolumeX } from 'lucide-react';

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    audioRef,
  } = useContext(PlayerContext);

  const volumeBarRef = useRef();
  const volumeLevelRef = useRef();
  const [isMuted, setIsMuted] = useState(false);

  const changeVolume = (e) => {
    const volumeWidth = volumeBarRef.current.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const volume = Math.min(1, Math.max(0, clickX / volumeWidth));
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = false;
      setIsMuted(false);
      if (volumeLevelRef.current) {
        volumeLevelRef.current.style.width = `${volume * 100}%`;
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const currentMute = !audioRef.current.muted;
    audioRef.current.muted = currentMute;
    setIsMuted(currentMute);
    if (volumeLevelRef.current) {
      volumeLevelRef.current.style.width = currentMute
        ? '0%'
        : `${audioRef.current.volume * 100}%`;
    }
  };

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      
      {/* Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt={track.name} />
        <div>
          <p>{track.name}</p>
          <p className="text-xs text-gray-400">
            {track.desc.split(' • ')[0]}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 items-center">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="shuffle" />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="prev" />
          {playStatus ? (
            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="pause" />
          ) : (
            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="play" />
          )}
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="next" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="loop" />
        </div>

        {/* Seekbar */}
        <div className="flex items-center gap-4 text-xs">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 h-1 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>

      {/* Extra Icons & Volume */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="plays" />
        <img className="w-4" src={assets.mic_icon} alt="mic" />
        <img className="w-4" src={assets.queue_icon} alt="queue" />
        <img className="w-4" src={assets.speaker_icon} alt="speaker" />

        {/* Mute Toggle Icon */}
        <div className="cursor-pointer" onClick={toggleMute}>
          {isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
        </div>

        {/* Volume Bar */}
        <div
          ref={volumeBarRef}
          onClick={changeVolume}
          className="w-20 bg-gray-500 h-1 rounded cursor-pointer relative"
        >
          <div
            ref={volumeLevelRef}
            className="h-1 bg-green-400 absolute top-0 left-0"
            style={{ width: '100%' }}
          />
        </div>

        <img className="w-4" src={assets.mini_player_icon} alt="mini player" />
        <img className="w-4" src={assets.zoom_icon} alt="zoom" />
      </div>
    </div>
  ) : null;
};

export default Player;
