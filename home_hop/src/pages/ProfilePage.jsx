import { useEffect, useState } from 'react'
import { useAuth } from "../hooks/authContext";
import { FaStar, FaSuitcase, FaGlobe, FaBookAtlas, FaGear  } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom"
const ProfilePage = () => {
    const { isAuthenticated, user, checkAuthentication } = useAuth();
    const [authCheckComplete, setAuthCheckComplete] = useState(false);
    const [hostStats, setHostStats] = useState({});
  
    const host = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/accounts/host_stats/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setHostStats(data);
      } catch (error) {
        if (error) throw error;
        console.error('Failed to fetch host stats', error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await checkAuthentication();
          setAuthCheckComplete(true);
        } catch (error) {
          
          console.error('Authentication error', error);
        }
      };
  
      if (!authCheckComplete) {
        fetchData();
        host();
      }
    }, [checkAuthentication, authCheckComplete]);
  
    if (!authCheckComplete) {
      return <p>Loading...</p>;
    }
  return (
<>
    {
        isAuthenticated ?
        <div className="grid grid-cols-2 max-sm:grid-cols-1 grid-rows-1">
        { user ? 
        <div className='flex flex-col'>
        <div key={user.id} className='flex justify-center ml-80 max-sm:ml-0 mt-10'>
            <div className='h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow grid grid-cols-2'>
            
            
                    <div >
                        
                        <img className='rounded-full object-cover h-32 w-32 border-[1px]' src={`http://127.0.0.1:8000/accounts${user.pfp}`}alt="" />
                        <p className='text-2xl font-semibold max-w-[10rem] mt-2'>{user.username}</p>
                    </div>

            { user.role === "Host" ? 
            <div className='ml-6 flex flex-col'>
                <Link to="/profile_edit">
                    <FaGear className='absolute ml-[8rem] max-sm:ml-[6rem]' size="22" />
                </Link>
                

                
                <div>
                    <p className='text-2xl font-bold'>{user.role}</p>
                    <p className='text-base'>Role</p>

                     <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                     <div className='flex items-center'>
                         <p className='text-2xl font-bold mr-1'>{hostStats.rating}</p> <FaStar color='orange' size="17" />
                     </div>
                     <p className='text-base'>Rating</p>
                     <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                     <p className='text-2xl font-bold'>{hostStats.reviews}</p>
                     <p className='text-base'>Reviews</p>
                     <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                     <p className='text-2xl font-bold'>{hostStats.years_hosting}</p>
                     <p className='text-base'>Years hosting</p>
                </div>
            </div>
            :
            <div>
            <Link to="/profile_edit">
            <span className=' sr-only'>Edit profile</span>
            <FaGear className='absolute ml-[8rem] max-sm:ml-[6rem]' size="22" />
        </Link>
            <div className="ml-10 flex flex-col justify-center">
                <p className='text-2xl font-bold'>{user.role}</p>
                <p className='text-base'>Role</p>
            </div>
            </div>

                                }
            </div>
        </div>
        <div className='h-full flex justify-center ml-80 max-sm:ml-0 mt-10 '>
        <Link className='' to="/create_offer">
        <div className='h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow text-center bg-gray-800 hover:bg-gray-600'> 
            
                <h3 className='font-bold text-xl text-white'>
                    Create a new offer
                </h3>
           
        </div>
        </Link>
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
        {
      user ? 
      <div key={user.id}>
          <p>Aaaaa</p>
      </div>
    :
    null  
  }
 
    </div>
    :
    <Navigate to="/login" />
    }
  
</>



  )
}

export default ProfilePage
