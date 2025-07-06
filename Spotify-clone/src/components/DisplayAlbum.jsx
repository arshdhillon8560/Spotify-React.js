import React, { useContext } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);

  const albumData = albumsData.find(album => album._id === id);

  if (!albumData) {
    return (
      <>
        <Navbar />
        <div className="text-white text-center mt-10">
          <h2>Album not found</h2>
        </div>
      </>
    );
  }

  const filteredSongs = songsData.filter(song => song.album === albumData.name);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1 text-sm text-[#a7a7a7]">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b> Spotify </b> • 1,223,456 likes • <b>{filteredSongs.length} songs</b>
          </p>
        </div>
      </div>

      
      <div className="hidden sm:grid sm:grid-cols-[4fr_2fr_2fr_1fr] mt-10 mb-4 px-2 text-[#a7a7a7] text-sm font-medium">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p>Date added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="duration" />
      </div>
      <hr className="border-gray-700 mb-2" />

      
      {filteredSongs.map((item, index) => (
        <div
          onClick={() => playWithId(item._id)}
          key={item._id}
          className="grid grid-cols-1 sm:grid-cols-[4fr_2fr_2fr_1fr] items-center gap-4 p-3 hover:bg-white/10 cursor-pointer transition text-white text-sm"
        >
        
          <div className="flex items-center gap-3 min-w-0">
            <img className="w-11 h-11 rounded object-cover shrink-0" src={item.image} alt={item.name} />
            <div className="truncate">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {(item.desc?.split(' • ')[0]) || (item.artist || albumData.name)}
              </p>
            </div>
          </div>

      
          <p className="hidden sm:block truncate">{albumData.name}</p>

      
          <p className="hidden sm:block text-gray-400 text-sm">5 days ago</p>

      
          <p className="hidden sm:block text-center text-gray-300 text-sm">{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
