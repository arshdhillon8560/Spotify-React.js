import axios from 'axios';
import { useState, useEffect } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';
import { Trash } from 'lucide-react';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-4">
      <p className="text-xl font-semibold text-gray-800 mb-4">All Albums</p>

      <div className="overflow-x-auto">
        <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-t-md text-sm font-medium text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Description</span>
          <span>Colour</span>
          <span>Action</span>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className="grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] grid-cols-1 sm:items-center gap-4 p-4 border-b border-gray-300 text-sm bg-transparent hover:bg-gray-100/40 transition"
          >
            <div className="flex sm:justify-center items-center">
              <img className="w-12 h-12 object-cover rounded mr-16" src={item.image} alt="" />
            </div>
            <div>
              <p className="text-gray-800 font-medium">{item.name}</p>
            </div>
            <div>
              <p className="text-gray-600">{item.desc}</p>
            </div>
            <div>
              <input
                type="color"
                value={item.bgColour}
                disabled
                className="w-10 h-10 border border-gray-300 rounded cursor-default"
              />
            </div>
            <div className="flex sm:justify-center items-center">
              <Trash
                onClick={() => removeAlbum(item._id)}
                className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer lg:mr-16 ml-2 lg:ml-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
