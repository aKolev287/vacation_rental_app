import { useEffect, useState } from "react";
import {
  FaCity,
  FaEnvelope,
  FaIdCard,
  FaSuitcase,
  FaUser,
  FaMessage,
  FaClipboardUser,
} from "react-icons/fa6";
import { useAuth } from "../hooks/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import PostFormField from "../components/PostFormField";

const EditProfile = () => {
  const { isAuthenticated, user, checkAuthentication } = useAuth();
  const navigate = useNavigate();
  const [pfp, setPfp] = useState(
    `http://127.0.0.1:8000/accounts${user?.pfp}` || ""
  );
  const [bio, setBio] = useState(user?.bio || "");
  const [username, setUsername] = useState(user?.username || "");
  const [first_name, setFirstName] = useState(user?.first_name || "");
  const [last_name, setLastName] = useState(user?.last_name || "");
  const [lives_in, setLivesIn] = useState(user?.lives_in || "");
  const [works_in, setWorksIn] = useState(user?.works_in || "");
  const [speaks, setSpeaks] = useState(user?.speaks || "");

  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        await checkAuthentication();
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPfp(file);
  };
  const update = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("lives_in", lives_in);
    formData.append("works_in", works_in);
    formData.append("speaks", speaks);
    // Only append the 'pfp' field if a new image is selected
    if (pfp !== null && pfp instanceof File) {
      formData.append("pfp", pfp);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/edit/", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        checkAuthentication();
        navigate("/profile");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update profile!", errorResponse);
      }
    } catch (err) {
      console.error("Error updating profile!", err);
    }
  };

  const deleteProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/delete/", {
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
        console.error("Failed to delete profile!", errorResponse);
      }
    } catch (err) {
      console.error("Error deleting profile!", err);
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
              Edit profile
            </p>
            <div className="mt-3">
              <PostFormField type="email" value={user.email}  placeholder="Email" disabled={true} icon={<FaEnvelope className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="file" accept="image/*" func={(e) => handleImageChange(e)} icon={<FaClipboardUser className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="text" value={username} placeholder="Username" func={(e) => setUsername(e.target.value)} icon={<FaUser className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="text" value={first_name} placeholder="First Name" func={(e) => setFirstName(e.target.value)} icon={<FaIdCard className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="text" value={last_name} placeholder="Last Name" func={(e) => setLastName(e.target.value)} icon={<FaIdCard className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="text" value={works_in} placeholder="Works in" func={(e) => setWorksIn(e.target.value)} icon={<FaSuitcase className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="text" value={lives_in} placeholder="Lives in" func={(e) => setLivesIn(e.target.value)} icon={<FaCity className="ml-3" color="gray" size="20" /> } />
              <PostFormField type="text" value={speaks} placeholder="Languages" func={(e) => setSpeaks(e.target.value)} icon={<FaIdCard className="ml-3" color="gray" size="20" /> } />
              <div className="relative mt-3">
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <FaMessage className="ml-3" color="gray" size="20" />
                </div>
                <textarea
                  className="appearance-none border pl-12 h-20 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="text"
                  value={bio}
                  placeholder="Description"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <button
                  className="text-gray-800 py-2 px-4 uppercase rounded bg-white hover:bg-gray-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={update}
                >
                  Update
                </button>
                <button
                  className="text-white py-2 px-4 mx-5 max-sm:mx-2 uppercase rounded bg-gray-600 hover:bg-gray-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={logout}
                >
                  Log out
                </button>
                <button
                  className="text-white py-2 px-4 uppercase rounded bg-red-600 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={deleteProfile}
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
  );
};

export default EditProfile;
