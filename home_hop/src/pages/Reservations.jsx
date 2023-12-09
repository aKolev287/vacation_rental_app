import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reservations = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/posts/view/${username}/`);
        const data = await response.json();

        // Filter out posts without reservations
        const postsWithReservations = data.filter((post) => post.reservation.length > 0);
        setPosts(postsWithReservations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <div className='max-w-2xl mx-auto p-4'>
    <h1 className='text-3xl font-bold mb-4'>{username}{"'s"} reservation feed</h1>
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
  {posts?.map((post) => (
    <div key={post.id} className="bg-white border-[1px] p-4 rounded-lg shadow-md">
      <p className="text-lg font-bold mb-2">Reservation for {post.title}</p>
      {post.reservation?.map((res) => (
        <div key={res.id} className="border-t pt-4 mt-4">
          <p className="text-gray-700">Reserved by {res.user?.username}</p>
          <p className="text-gray-700">Stay duration: {res.days} days</p>
          <p className="text-gray-700">Check-in: {res.check_in}</p>
          <p className="text-gray-700">Check-out: {res.check_out}</p>
          <p className="text-gray-700">Guests: {res.guests}</p>
          <p className="text-green-600 font-semibold">Price: {res.price}$</p>
        </div>
      ))}
    </div>
  ))}
</div>


    </div>
  );
};

export default Reservations;


