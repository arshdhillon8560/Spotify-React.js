import React, { useContext } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import { PlayerContext } from "./context/PlayerContext.jsx";

const App = () => {
  const { songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData.length > 0 && (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      )}
    </div>
  );
};

export default App;
