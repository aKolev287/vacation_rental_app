import { useEffect, useState } from "react";
import { useAuth } from "../hooks/authContext";

import FrontPageCards from "../components/FrontPageCards";

import {FaCaretRight, FaForward } from "react-icons/fa6";
const HomePage = () => {
  const { checkAuthentication } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Initial page number
  const [isLastPage, setIsLastPage] = useState(false); // Track if it's the last page
  const [lastPage, setLastPage] = useState(1); // Last page number  

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= lastPage) {
      setCurrentPage(pageNumber);
    }
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
  }
  }
  useEffect(() => {
    checkAuthentication();
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/posts/view/?page=${currentPage}`);
        const data = await response.json();
        console.log(data);
        // Check if it's the last page
        setIsLastPage(!data.next);

        setLastPage(Math.ceil(data.count / 10))
        // Update the image URL in each post object
        const updatedPosts = data.results.map(post => {
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
    fetchPosts()
  }, [currentPage]);
  

  return (
    
    <div>
      <div className="flex justify-between flex-col">
      <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2  max-sm:grid-cols-1 max-sm:gap-5">
      {posts.map((post) => (
        <FrontPageCards key={post.id} id={post.id} image={post.image} description={post.description} location={post.location} rating={post.rating} price={post.price} date={post.date} />
      ))}
      </div>

      <div className="flex justify-center mt-20 gap-3">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Go to first page</span>
          <FaForward size="15" className="rotate-180" />
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Go previous page</span>
          <FaCaretRight size="15" className="rotate-180" />
        </button>

        {[currentPage - 1, currentPage, currentPage + 1]
          .filter((page) => page > 0 && page <= lastPage)
          .map((page) => (
            <button
              key={page}
              className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800 ${
                currentPage === page ? 'bg-gray-700' : ''
              }`}
              onClick={() => goToPage(page)}
              disabled={currentPage === page}
            >
              {page}
              <span className="sr-only">Page: {page}</span>
            </button>
          ))}

        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800"
          onClick={nextPage}
          disabled={isLastPage}
        >
          <span className="sr-only">Go next  page</span>
          <FaCaretRight size="15" />
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800"
          onClick={() => goToPage(lastPage)}
          disabled={currentPage === lastPage}
        >
          <span className="sr-only">Go to last page</span>
          <FaForward size="15" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
