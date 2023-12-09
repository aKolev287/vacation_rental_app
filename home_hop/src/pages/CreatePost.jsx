import { useEffect, useState } from "react";
import {
  FaMessage,
  FaHeading,
  FaPaperclip,
  FaPeopleRoof,
  FaDollarSign,
  FaLocationDot,
  FaBed,
  FaToiletPaper,
  FaRegGem,
} from "react-icons/fa6";
import Select from "react-select";
import { useAuth } from "../hooks/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import PostFormField from "../components/PostFormField";

const CreatePost = () => {
  const { isAuthenticated, user, checkAuthentication } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [guests, setGuests] = useState(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [beds, setBeds] = useState("");
  const [amenities, setAmenities] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [error, setError] = useState(null);

  const options = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "unusual", label: "Unusual" },
    { value: "iconic_city", label: "Iconic city" },
    { value: "mountain", label: "Mountain" },
    { value: "desert", label: "Desert" },
    { value: "tropical", label: "Tropical" },
    { value: "arctic", label: "Arctic" },
    { value: "forest", label: "Forest" },
  ];

  const navigate = useNavigate();

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const createOffer = async () => {
    if (
      !title ||
      !description ||
      guests <= 0 ||
      price <= 0 ||
      !location ||
      !bathrooms ||
      !bedrooms ||
      !beds ||
      !selectedTag
    ) {
      setError(
        "Please fill in all fields and ensure that guest count and price are greater than zero."
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("guests", guests);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("bathrooms", bathrooms);
    formData.append("bedrooms", bedrooms);
    formData.append("beds", beds);
    formData.append("amenities", amenities);
    formData.append("tags", selectedTag.value);

    if (image !== null && image instanceof File) {
      formData.append("image", image);
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/posts/create/", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        checkAuthentication();
        navigate("/");
      }
    } catch (error) {
      if (error) throw error;
    }
  };
  useEffect(() => {
    //checkAuthentication();
  });
  return (
    <div>
      {isAuthenticated ? (
        <div key={user.id} className="p-8 lg:w-1/3 mx-auto z-10">
          <div className="bg-gray-800 rounded-lg py-12 px-4 lg:px-24">
            <p className="text-center text-2xl text-white font-light">
              Create post
            </p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-3">
              <PostFormField
                type="text"
                placeholder="Title"
                func={(e) => setTitle(e.target.value)}
                icon={<FaHeading className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="file"
                placeholder="Image"
                accept="image/*"
                func={(e) => handleImageChange(e)}
                icon={<FaPaperclip className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="number"
                placeholder="Price"
                func={(e) => setPrice(e.target.value)}
                icon={<FaDollarSign className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="number"
                placeholder="Max guests"
                func={(e) => setGuests(e.target.value)}
                icon={<FaPeopleRoof className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="text"
                placeholder="Location"
                func={(e) => setLocation(e.target.value)}
                icon={<FaLocationDot className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="number"
                placeholder="Bathrooms"
                func={(e) => setBathrooms(e.target.value)}
                icon={<FaToiletPaper className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="number"
                placeholder="Bedrooms"
                func={(e) => setBedrooms(e.target.value)}
                icon={<FaBed className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="number"
                placeholder="Beds"
                func={(e) => setBeds(e.target.value)}
                icon={<FaBed className="ml-3" color="gray" size="20" />}
              />
              <PostFormField
                type="text"
                placeholder="Amenities"
                func={(e) => setAmenities(e.target.value)}
                icon={<FaRegGem className="ml-3" color="gray" size="20" />}
              />
              <div className="relative mt-3">
                <Select
                  options={options}
                  value={selectedTag}
                  onChange={handleTagChange}
                  placeholder="Select tag"
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
  );
};

export default CreatePost;
