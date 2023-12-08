import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FrontPageCards from '../components/FrontPageCards';

function FilteredPostsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get('tags');

  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Fetch posts based on the tag parameter
    const fetchFilteredPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/posts/view/?tags=${tag}`);
        const data = await response.json();
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
        setFilteredPosts(updatedPosts);
      } catch (error) {
        console.error('Error fetching filtered posts:', error);
      }
    };

    fetchFilteredPosts();
  }, [tag]);

  return (
    <div>
    <div className="grid grid-cols-5 max-md:grid-cols-3 max-md:gap-96 max-sm:grid-cols-1 max-sm:gap-5"> 
    {filteredPosts.map((post) => (
        <FrontPageCards key={post.id} id={post.id} image={post.image} description={post.description} location={post.location} rating={post.rating} price={post.price} date={post.date} />

      ))}
    </div>

    </div>
  );
}

export default FilteredPostsPage;
