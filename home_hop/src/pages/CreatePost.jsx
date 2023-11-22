import { useEffect, useState } from "react";
import {
  FaMessage,
  FaHeading,
  FaPaperclip,
  FaPeopleRoof,
  FaDollarSign,
  FaLocationDot,
} from "react-icons/fa6";
import { useAuth } from "../hooks/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { isAuthenticated, user, checkAuthentication } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [guests, setGuests] = useState(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const createOffer = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("guests", guests);
    formData.append("location", location);
    formData.append("price", price);
    if (image !== null && image instanceof File) {
        formData.append("image", image);
      }
    try {
        const response = await fetch("http://127.0.0.1:8000/posts/create/", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        if (response.ok) {
           checkAuthentication()
           navigate("/")
        }
    } catch (error) {
        if (error) throw error;
        console.log("Error creating offer", error);
    }
  }
  useEffect(() => {
    //checkAuthentication();
  })
  return (
    <div>
      {isAuthenticated ? (
        <div key={user.id} className="p-8 lg:w-1/3 mx-auto z-10">
          <div className="bg-gray-800 rounded-lg py-12 px-4 lg:px-24">
            <p className="text-center text-2xl text-white font-light">
              Edit profile
            </p>
            <div className="mt-6">
              <div className="relative">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e)}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaHeading className="ml-3" color="gray" size="20" />
                </div>
              </div>
              <div className="relative mt-3">
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaPaperclip className="ml-3" color="gray" size="20" />
                </div>
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
              <div className="relative mt-3">
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaDollarSign className="ml-3" color="gray" size="20" />
                </div>
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="number"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="relative mt-3">
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaPeopleRoof className="ml-3" color="gray" size="20" />
                </div>
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="number"
                  placeholder="Max guests"
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              <div className="relative mt-3">
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaLocationDot className="ml-3" color="gray" size="20" />
                </div>
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="text"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="relative mt-3">
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaMessage className="ml-3" color="gray" size="20" />
                </div>
                <textarea
                  className="appearance-none border pl-12 h-20 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="text"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  className="text-gray-800 py-2 px-4 uppercase rounded bg-white hover:bg-gray-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={createOffer}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/profile" />
      )}
    </div>
  )
}

export default CreatePost
