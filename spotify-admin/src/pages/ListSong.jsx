import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="p-4">
      <p className="text-xl font-semibold text-gray-800 mb-4">All Songs</p>

      <div className="overflow-x-auto">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-t-md text-sm font-medium text-gray-700">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>

        {/* Song Rows */}
        {data.map((item, index) => (
          <div
            key={index}
            className="grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] grid-cols-1 sm:items-center gap-4 p-4 border-b border-gray-300 text-sm bg-transparent hover:bg-gray-100/40 transition"
          >
            <div className="flex sm:justify-center items-center">
              <img className="w-12 h-12 object-cover rounded mr-16" src={item.image} alt="" />
            </div>
            <p className="text-gray-800 font-medium">{item.name}</p>
            <p className="text-gray-600">{item.album}</p>
            <p className="text-gray-600">{item.duration}</p>
            <div className="flex sm:justify-center items-center">
              <Trash
                onClick={() => removeSong(item._id)}
                className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer lg:mr-16 ml-1 lg:ml-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;
