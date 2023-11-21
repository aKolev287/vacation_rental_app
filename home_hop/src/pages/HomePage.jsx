import { useEffect, useState } from "react";
import { useAuth } from "../hooks/authContext";
import MiniBar from "../components/MiniBar";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { checkAuthentication } = useAuth();
  const [ posts, setPosts ] = useState([]);

  const fetchPosts = async() => {
    try {
      const response = await fetch("http://localhost:8000/posts/view/");
      const data = await response.json();
      setPosts(data);
    }
    catch (err) {
      if (err) throw err;
      console.log("Error while fetching data", err);
    }
  }



  useEffect(() => {
    checkAuthentication();
    fetchPosts();
  }, [])

  return (
    <div>
      <MiniBar />
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <Link to={`http://localhost:5173/profile/${post.by_user}`}>Post by {post.by_user}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

