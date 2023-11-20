import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaSuitcase, FaGlobe, FaBookAtlas } from "react-icons/fa6";

const UserPage = () => {
  const { username } = useParams()
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`http://127.0.0.1:8000/accounts/user/${username}/`,    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const response_stats = await fetch(`http://127.0.0.1:8000/accounts/host_stats/${username}/`,    {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
    });
      const stats_data = await response_stats.json(); 
      const data = await response.json();
      setUser(data);
      setStats(stats_data);
    };
  
    fetchUserProfile();
  }, [username]);
  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 grid-rows-1">
    { user ? 
    <div key={user.id} className='flex justify-center ml-80 max-sm:ml-0 mt-10'>
        <div className='h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow grid grid-cols-2'>
        
        
                <div >
                    
                    <img className='rounded-full object-cover h-32 w-32 border-[1px]' src={`http://127.0.0.1:8000/accounts${user.pfp}`}alt="" />
                    <p className='text-2xl font-semibold max-w-[10rem] mt-2'>{user.username}</p>
                </div>

{ user.role === "Host" ? 
        <div className='ml-6 flex flex-col'>
            
            <div>
                <p className='text-2xl font-bold'>{user.role}</p>
                <p className='text-base'>Role</p>

                 <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                 <div className='flex items-center'>
                     <p className='text-2xl font-bold mr-1'>{stats.rating}</p> <FaStar color='orange' size="17" />
                 </div>
                 <p className='text-base'>Rating</p>
                 <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                 <p className='text-2xl font-bold'>{stats.reviews}</p>
                 <p className='text-base'>Reviews</p>
                 <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                 <p className='text-2xl font-bold'>{stats.years_hosting}</p>
                 <p className='text-base'>Years hosting</p>
            </div>


        </div>
            :
            <div className="ml-10 flex flex-col justify-center">
                <p className='text-2xl font-bold'>{user.role}</p>
                <p className='text-base'>Role</p>
            </div>
        }
                    
        </div>
    </div>
        :
        null
    }

    {   user ?
            <div className='flex justify-start flex-col px-10 mt-10'> 
             <h1 className='text-3xl font-semibold'>About {user.username}</h1>
             <div className='mt-3 text-xl'>
                <div className='flex items-center'>
                <FaSuitcase /><p className='m-2'>Works in: {user.works_in}</p>
                </div>
                <div className='flex items-center'> 
                <FaGlobe /><p className='m-2'>Lives in {user.lives_in}</p>
                </div>
                <div className='flex items-center'> 
                <FaBookAtlas /><p className='m-2'>Speaks: {user.speaks}</p>
                </div>
             </div>
             <div className=' max-w-lg'>
                <h2 className='text-3xl mt-3'>Description</h2>
                <p className='text-lg mt-2'>
                {user.bio}
                </p>
             </div>
            </div>
            :
        null
    }

</div>
  )
}

export default UserPage
