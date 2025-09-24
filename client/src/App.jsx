import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const [file, setFile] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const fileInputRef = useRef(null);

  const loadImages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/images`
      );
      if (response?.data?.data) {
        setExistingImages(response.data.data);
        //console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const addNewImage = async () => {
    try {
      if (!file) return;
      const uploading = toast.loading("Uploading...");

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/images`,
        formData
      );
      // console.log(response.data.image);
      if (response) {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.dismiss(uploading);
        loadImages();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <main className="flex flex-col md:flex-row items-start justify-center gap-10 p-10 min-h-screen bg-gradient-to-br from-slate-100 to-slate-300">
      <section className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-60">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Upload Image
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            addNewImage();
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-slate-700"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/*  for type="file" input stores files in files array files=[.......]. Even if we select single file we have to use files[0]*/}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-white font-semibold shadow-lg 
              bg-gradient-to-r from-cyan-600 to-violet-600 hover:scale-105 
              transition-transform duration-300 ease-in-out cursor-pointer"
          >
            Upload
          </button>
        </form>
      </section>

      <section className="flex-1">
        <h3 className="text-xl font-semibold mb-6 text-slate-800">
          Uploaded Images
        </h3>
        <div className="overflow-auto h-140">
          {existingImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {existingImages.map((item, index) => (
                <article
                  key={index}
                  className="overflow-hidden rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={item.imageURL}
                    alt="Image"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </article>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 italic">No images uploaded yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
