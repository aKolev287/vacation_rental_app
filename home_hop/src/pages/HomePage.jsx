import { useEffect, useState } from "react";
import { useAuth } from "../hooks/authContext";
import MiniBar from "../components/MiniBar";
import { Link } from "react-router-dom";
import { FaLocationDot, FaStar, FaDollarSign, FaCalendarDay } from "react-icons/fa6";
const HomePage = () => {
  const { checkAuthentication } = useAuth();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts/view/");
      const data = await response.json();

      // Update the image URL in each post object
      const updatedPosts = data.map(post => {
        const formattedDate = new Date(post.date); // Convert the date string to a Date object
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          timeZone: 'UTC', // Assuming the date string is in UTC
        };
        const formattedDateString = new Intl.DateTimeFormat('en-US', options).format(formattedDate);
      
        return {
          ...post,
          image: `http://localhost:8000/posts${post.image.substring(21)}`,
          date: formattedDateString,
          description: post.description.slice(0, 98)
        };
      });

      setPosts(updatedPosts);
    } catch (err) {
      if (err) throw err;
      console.log("Error while fetching data", err);
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchPosts();
  }, []);
//  <Link to={`http://localhost:5173/profile/${post.by_user}`}>
//  Post by {post.by_user}
//</Link>
  return (
    <div>
      <MiniBar />
      <div className="grid grid-cols-5 max-md:grid-cols-3 max-md:gap-96 max-sm:grid-cols-1 max-sm:gap-5">
      {posts.map((post) => (
        <div key={post.id} className="border-b-[1px] border-x-[1px] rounded-xl shadow-lg flex flex-col w-[20rem] mx-8 mt-10">
          <img className="w-full h-60 object-cover rounded-lg" src={post.image} alt="" />
          <div className="p-2">
            <div className="flex justify-between pr-2 mt-2">
              <div className="flex items-center text-lg ">
                <FaLocationDot size="16"/><p className="ml-1 font-semibold">{post.location}</p>
              </div>
              <div className="flex items-center text-lg">
              <FaStar color='orange' size="16" /><p className="ml-1 font-semibold" >{post.rating}</p>
              </div>
            </div>

            <div className="flex justify-between pr-2 mt-2">
              <div className="flex items-center text-sm ml-1 ">
                <p className="font-medium text-gray-600">{post.description}...</p>
              </div>
            </div>
           
            <div className="flex justify-between pr-2 mt-2">
              <div className="flex items-center text-lg ">
                <FaDollarSign size="16"/><p className="font-semibold">{post.price}/night</p>
              </div>
              <div className="flex items-center text-sm ">
                <FaCalendarDay size="13"/><p className="ml-1 font-semibold">{post.date}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>

    </div>
  );
};

export default HomePage;
