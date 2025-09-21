import React, { useState } from "react";
import axios from "axios";

function App() {
  const [imageURL, setImageURL] = useState("");

  const addNewImage = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/images`,
      { imageURL }
    );
    console.log(response.data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Upload Your Image
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="block w-full text-sm text-slate-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border
              file:text-sm file:font-semibold
              
              hover:file:opacity-90 cursor-pointer border border-slate-300 rounded-lg p-2"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />

          <button
            onClick={addNewImage}
            className="w-full py-2 px-4 rounded-lg text-white font-semibold shadow-lg 
              bg-gradient-to-r from-cyan-600 to-violet-600 hover:scale-105 
              transition-transform duration-300 ease-in-out cursor-pointer"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
