import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { FaLocationDot, FaStar, FaMinus, FaPlus, FaCheck } from "react-icons/fa6";
import Comments from '../components/Comments';
import PostComment from '../components/PostComment';
const PostDetails = () => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("")
  const [warning, setWarning] = useState("")

  const { id } = useParams();
  const [post, setPost] = useState({});

  const [guests, setGuests] = useState(1);
  const fetchData = async () => {
    const response_stats = await fetch(`http://127.0.0.1:8000/posts/view/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const data = await response_stats.json();
    setPost(data);
  }
  // Parse date strings into Date objects
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  // Calculate the difference in milliseconds
  const timeDifference = date2 - date1;

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  const total = daysDifference * (post.price)

  
  useEffect(() => {
    fetchData();

  }, [id])

  useEffect(() => {
    // console.log(startDate)
    // console.log(endDate)
    // console.log(daysDifference);
    // console.log(post.price)
    if (total !== isNaN){
      setPrice(total);
      if (total > 0) {
        setMessage(`${post.price}$ x ${daysDifference} day stay = ${price}$`)
        setWarning("")
      }
      else{
        setWarning("You cannot set a date in the past!")
        setMessage("")
      }
    }
    console.log(price)
  })
  return (
    <div className='grid grid-cols-1 px-96 max-sm:p-3'>

      <h1 className='font-semibold text-3xl self-center max-sm:mr-0 my-10'>{post.title}</h1>
      <div className='self-center'>
        <img className="w-full h-[30rem] object-cover rounded-lg" src={`http://127.0.0.1:8000/posts${post.image}`} alt="" />
      </div>
      <div className='text-lg self-center max-sm:mr-0 my-10'>
        <div className='flex items-center text-2xl'>
          <FaLocationDot size="20" /><p className='ml-2 font-semibold'>{post.location}</p>
        </div>
        <div className='flex items-center text-xl my-2'>
          <FaCheck size="20" /><p className='ml-2 font-semibold'>{post.guests} guests - {post.bedrooms > 1 ? `${post.bedrooms} bedrooms` :  `${post.bedrooms} bedroom`} - {post.beds > 1 ? `${post.beds} beds` :  `${post.beds} bed`} - {post.bathrooms > 1 ? `${post.bathrooms} bathrooms` :  `${post.bathrooms} bathroom`}</p> 
        </div>
        <div className='flex items-center text-xl mb-2'>

          <FaStar size="20" /><p className='ml-2 font-semibold' >{post.rating}</p>
        </div>

        <div className='border-b-[1px]' />

        <p className='py-2 font-semibold'>Hosted by <Link to={`http://localhost:5173/profile/${post.by_user}/`} className='hover:text-gray-500 underline' >{post.by_user}</Link></p>

        <div className='border-b-[1px]' />
      </div>


      <div className='grid grid-cols-2 gap-40'>
        <p className='text-xl max-w-2xl'>{post.description}
        </p>
        <div className='border-[1px] border-gray-300 rounded-xl shadow-lg max-h-80 max-w-[26.7rem] p-5'>
          <p className='text-xl font-semibold ml-2'>{post.price}$/night</p>
          <div className='p-1 my-4'>
          <div className="flex items-center">
              <input name="start" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Select date start" onChange={(e) => setStartDate(e.target.value) } />
            <span className="mx-4 text-gray-500">to</span>
              <input name="end" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 " placeholder="Select date end" onChange={(e) => setEndDate(e.target.value)}/>
              
          </div>

          <div className='flex justify-center my-1'>
          <p className='text-semibold text-red-600'>{warning}</p>
          </div>
          <div className='flex justify-between items-center my-3 '>
            <p className=' font-semibold'>Guests: </p>
            <div className='flex justify-center items-center'>
              <div className='p-2 border-[1px] rounded-full border-gray-300 hover:shadow-lg hover:bg-gray-100 cursor-pointer' onClick={() => guests <= 1 ? setGuests(1) : setGuests(guests-1)}>
                <FaMinus size="15"/>
              </div>
              <p className=' font-semibold mx-3'>{guests}</p>
              <div className='p-2 border-[1px] rounded-full border-gray-300 hover:shadow-lg hover:bg-gray-100 cursor-pointer' onClick={() => guests >= post.guests ? setGuests(post.guests) : setGuests(guests+1)}>
                <FaPlus size="15"/>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <p className=' font-semibold'>Price: </p>
            <div className='flex justify-center items-center'>
              <p className=' font-semibold'>{message}</p>
            </div>
          </div>
          </div>

          <button className='bg-gray-900 text-white text-xl p-3 items-center w-full rounded-xl font-semibold shadow-lg  my-4'>Reseve</button>
        </div>

      </div>
      <div className='border-b-[1px] my-5' />
      <PostComment post={post.id} fn={fetchData}/>
      <Comments post={post} />
     

    </div>
  )
}

export default PostDetails
