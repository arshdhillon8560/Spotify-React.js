import React, { useContext, useEffect, useRef } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.split('/').pop() : '';
  const { albumsData } = useContext(PlayerContext);

useEffect(() => {
  if (isAlbum) {
    const album = albumsData.find((a) => a._id === albumId);
    if (album?.bgColour) {
      displayRef.current.style.background = `linear-gradient(${album.bgColour}, #121212)`;
    } else {
      displayRef.current.style.background = '#121212';
    }
  } else {
    displayRef.current.style.background = '#121212';
  }
}, [location.pathname, albumsData]);


  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
