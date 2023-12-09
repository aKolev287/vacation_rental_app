import { useEffect, useState } from "react";
import { useAuth } from "../hooks/authContext";
import {
  FaStar,
  FaSuitcase,
  FaGlobe,
  FaBookAtlas,
  FaGear,
} from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import UserPostsCard from "../components/UserPostsCard";
import ProfileComments from "../components/ProfileComments";

const ProfilePage = () => {
  const { isAuthenticated, user, checkAuthentication } = useAuth();
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [avarageRating, setAvarageRating] = useState(0);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/posts/comments/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      if (error) throw error;
      console.error("Failed to fetch host stats", error);
    }
  };

  const fetchPosts = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/posts/view_user_post/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    setPosts(data);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAuthentication();
        setAuthCheckComplete(true);
      } catch (error) {
        console.error("Authentication error", error);
      }
    };

    if (!authCheckComplete) {
      fetchData();
      fetchPosts();
      fetchComments();
    }
  }, [checkAuthentication, authCheckComplete]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const arr = [];
      posts.map((r) => {
        if (r.rating > 0) {
          arr.push(r.rating);
        }
      });
    
      if (arr.length > 0) {
        const totalRating = arr.reduce((t, num) => t + num, 0);
        const averageRating = totalRating / arr.length;
        setAvarageRating(averageRating);
      } else {
        // Handle the case where there are no ratings
        setAvarageRating(0);
      }
    } else {
      // Handle the case where posts is undefined or empty
      setAvarageRating(0);
    }
  })

  if (!authCheckComplete) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 grid-rows-1">
          {user ? (
            <>
              <div className="flex flex-col">
                <div
                  key={user.id}
                  className="flex justify-center ml-80 max-sm:ml-0 mt-10"
                >
                  <div className="h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow grid grid-cols-2">
                    <div>
                      <img
                        className="rounded-full object-cover h-32 w-32 border-[1px]"
                        src={`http://127.0.0.1:8000/accounts${user.pfp}`}
                        alt=""
                      />
                      <p className="text-2xl font-semibold max-w-[10rem] mt-2">
                        {user.username}
                      </p>
                    </div>

                    <div className="ml-6 flex flex-col">
                      <Link to="/profile_edit">
                        <FaGear
                          className="absolute ml-[8rem] max-sm:ml-[6rem]"
                          size="22"
                        />
                      </Link>

                      <div className="mt-7">
                        <div className="flex items-center">
                          <p className="text-2xl font-bold mr-1">
                            {avarageRating}
                          </p>{" "}
                          <FaStar color="orange" size="17" />
                        </div>
                        <p className="text-base">Avarage Rating</p>
                        <div className="border-b-[1px] rounded-full border-gray-400 my-2"></div>
                        <p className="text-2xl font-bold">{comments.length}</p>
                        <p className="text-base">Reviews</p>
                        <div className="border-b-[1px] rounded-full border-gray-400 my-2"></div>
                        <p className="text-2xl font-bold">{posts?.length}</p>
                        <p className="text-base">Listings</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full flex justify-center ml-80 max-sm:ml-0 mt-10 ">
                  <div className="flex flex-col">
                  <Link className="" to={`/reservation/${user.username}`}>
                    <div className="h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow text-center bg-gray-800 hover:bg-gray-600">
                      <p className="font-bold text-xl text-white">
                        Incloming reservations
                      </p>
                    </div>
                  </Link>
                  <Link className="mt-3" to="/create_offer">
                    <div className="h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow text-center bg-gray-800 hover:bg-gray-600">
                      <p className="font-bold text-xl text-white">
                        Create a new offer
                      </p>
                    </div>
                  </Link>
                  </div>
                </div>
              </div>

              <div className="flex justify-start flex-col px-10 mt-10">
                <h1 className="text-3xl font-semibold">
                  About {user.username}
                </h1>
                <div className="mt-3 text-xl">
                  <div className="flex items-center">
                    <FaSuitcase />
                    <p className="m-2">Works in: {user.works_in}</p>
                  </div>
                  <div className="flex items-center">
                    <FaGlobe />
                    <p className="m-2">Lives in {user.lives_in}</p>
                  </div>
                  <div className="flex items-center">
                    <FaBookAtlas />
                    <p className="m-2">Speaks: {user.speaks}</p>
                  </div>
                </div>
                <div className=" max-w-lg">
                  <h2 className="text-3xl mt-3">Description</h2>
                  <p className="text-lg mt-2">{user.bio}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-center max-sm:ml-0 ml-80 mt-10">
                  <div className="flex flex-col">
                    <div className="border-b-[1px]" />
                    <p className="font-semibold text-2xl my-5">
                      {user.username}’s reviews
                    </p>
                    {comments.map((comment) => (
                      <ProfileComments key={comment.id} comment={comment} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-start flex-col px-10 mt-10 ">
                <div className="border-b-[1px]" />
                <p className="font-semibold text-2xl my-5">
                  {user.username}’s listings
                </p>
                <div className="grid grid-cols-3 gap-y-3 gap-2 max-sm:grid-cols-1 max-2xl:grid-cols-2 max-2xl:gap-10">
                  {posts?.map((post) => (
                    <UserPostsCard
                      key={post.id}
                      link={`/rooms/${post.id}`}
                      image={`http://127.0.0.1:8000/posts${post.image}`}
                      rating={post.rating}
                      location={post.location}
                      updatable={true}
                      editLink={`/edit/${post.id}`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProfilePage;
