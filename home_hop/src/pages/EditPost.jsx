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
  FaRegGem

} from "react-icons/fa6";
import { useAuth } from "../hooks/authContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PostFormField from "../components/PostFormField";

const EditPost = () => {
    const { id } = useParams();
    const { isAuthenticated, user, checkAuthentication } = useAuth();
  
    const [post, setPost] = useState({
      title: "",
      description: "",
      image: "",
      guests: 0,
      location: "",
      price: 0,
      bathrooms: 0,
      bedrooms: 0,
      beds: 0,
      amenities: "",
    });
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const [imageFile, setImageFile] = useState(null);
    const [guests, setGuests] = useState(0);
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [beds, setBeds] = useState(0);
    const [amenities, setAmenities] = useState("");
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/posts/view/${id}`);
          const data = await response.json();
          setPost(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [id]);
  
    useEffect(() => {
        setTitle(post.title || "");
        setDescription(post.description || "");
        setGuests(post.guests || 0);
        setLocation(post.location || "");
        setPrice(post.price || 0);
        setBathrooms(post.bathrooms || 0);
        setBedrooms(post.bedrooms || 0);
        setBeds(post.beds || 0);
        setAmenities(post.amenities || "");

    
      }, [post]);

    const deletePost = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/posts/delete/${id}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          if (response.ok) {
            checkAuthentication();
            navigate("/");
          } else {
            const errorResponse = await response.json();
            console.error("Failed to delete post!", errorResponse);
          }
        } catch (err) {
          console.error("Error deleting post!", err);
        }
      };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file);
    };
  
    const updateOffer = async () => {
      const formData = new FormData();
      formData.append("title", title || post.title);
      formData.append("description", description || post.description);
      formData.append("guests", guests || post.guests);
      formData.append("location", location || post.location);
      formData.append("price", price || post.price);
      formData.append("bathrooms", bathrooms || post.bathrooms);
      formData.append("bedrooms", bedrooms || post.bedrooms);
      formData.append("beds", beds || post.beds);
      formData.append("amenities", amenities || post.amenities);
  
      if (imageFile && imageFile instanceof File) {
        formData.append("image", imageFile);
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/posts/edit/${id}/`, {
          method: "PATCH",
          credentials: "include",
          body: formData,
        });
  
        if (response.ok) {
          checkAuthentication();
          navigate("/");
        }
      } catch (error) {
        console.error("Error updating offer:", error);
      }
    };
  
    useEffect(() => {
      checkAuthentication();
    }, []);
  return (
<div>
      {isAuthenticated ? (
        <div key={user.id} className="p-8 lg:w-1/3 mx-auto z-10">
          <div className="bg-gray-800 rounded-lg py-12 px-4 lg:px-24">
            <p className="text-center text-2xl text-white font-light">
              Edit offer
            </p>
            <div className="mt-3">
              <PostFormField type="text"   value={title}  placeholder="Title" func={(e) => setTitle(e.target.value)} icon={<FaHeading className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="file"   placeholder="Image" accept="image/*" func={(e) => handleImageChange(e)} icon={<FaPaperclip className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="number" value={price}  placeholder="Price" func={(e) => setPrice(e.target.value)} icon={<FaDollarSign className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="number" value={guests}  placeholder="Max guests" func={(e) => setGuests(e.target.value)} icon={<FaPeopleRoof className="ml-3" color="gray" size="20" />} />
              <PostFormField type="text"   value={location}  placeholder="Location" func={(e) => setLocation(e.target.value)} icon={<FaLocationDot className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="number" value={bathrooms}  placeholder="Bathrooms" func={(e) => setBathrooms(e.target.value)} icon={<FaToiletPaper className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="number" value={bedrooms}  placeholder="Bedrooms" func={(e) => setBedrooms(e.target.value)} icon={<FaBed className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="number" value={beds}  placeholder="Beds" func={(e) => setBeds(e.target.value)} icon={<FaBed className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="text"   value={amenities}  placeholder="Amenities" func={(e) => setAmenities(e.target.value)} icon={<FaRegGem className="ml-3" color="gray" size="20" /> } />
              
              <div className="relative mt-3">
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaMessage className="ml-3" color="gray" size="20" />
                </div>
                <textarea
                  className="appearance-none border pl-12 h-20 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="text"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  className="text-gray-800 py-2 px-4 uppercase rounded bg-white hover:bg-gray-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={updateOffer}
                >
                  Update
                </button>
                <button
                  className="text-white py-2 px-4 uppercase rounded bg-red-600 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={deletePost}
                >
                  Delete
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

export default EditPost
