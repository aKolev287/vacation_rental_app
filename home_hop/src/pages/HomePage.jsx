import { useEffect, useState } from "react";
import { useAuth } from "../hooks/authContext";
import MiniBar from "../components/MiniBar";
import { Link } from "react-router-dom";


import { FaLocationDot, FaStar, FaDollarSign, FaCalendarDay, FaCaretRight, FaForward } from "react-icons/fa6";
const HomePage = () => {
  const { checkAuthentication } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Initial page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isLastPage, setIsLastPage] = useState(false); // Track if it's the last page
  const [lastPage, setLastPage] = useState(1); // Last page number  


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
        // Set the total number of pages
        setTotalPages(data.count);
        setLastPage(Math.ceil(data.count / 15))
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
      <MiniBar />
      <div className="flex justify-between flex-col">
      <div className="grid grid-cols-5 max-md:grid-cols-3 max-md:gap-96 max-sm:grid-cols-1 max-sm:gap-5">
      {posts.map((post) => (
        <Link key={post.id} to={`http://localhost:5173/rooms/${post.id}`} >
        <div  className="border-b-[1px] border-x-[1px] rounded-xl shadow-lg hover:shadow-xl flex flex-col w-[20rem] mx-8 mt-10">
          <img className="w-full h-60 object-cover rounded-lg" src={post.image} srcSet="" alt="" />
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
        </Link>
      ))}
      </div>
      <div className="flex justify-center mt-20 gap-3">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800" onClick={() => setCurrentPage(1)}  disabled={currentPage === 1}><FaForward size="15" className="rotate-180" /></button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800" onClick={prevPage} disabled={currentPage === 1}><FaCaretRight size="15" className="rotate-180" /></button>
          {
            currentPage > 1 ? 
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === currentPage - 1}>{currentPage - 1}</button>
            :
            null
          }
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800" disabled={currentPage === currentPage}>{currentPage}</button>
          { isLastPage ? 
            null
            :
            <>
            { lastPage - 1 ?
              null 
              :
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === currentPage + 1}>{currentPage + 1}</button>

            }
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === currentPage + 1}>{lastPage}</button>
            </>
            
        }
          
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800" onClick={nextPage} disabled={isLastPage}><FaCaretRight size="15" /></button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-800"  onClick={() => setCurrentPage(lastPage)} disabled={currentPage === lastPage}><FaForward size="15" /></button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
