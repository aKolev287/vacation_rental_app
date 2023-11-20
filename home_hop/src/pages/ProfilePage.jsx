import { useEffect } from 'react'
import { useAuth } from "../hooks/authContext";
import { FaStar, FaSuitcase, FaGlobe, FaBookAtlas, FaGear  } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom"
const ProfilePage = () => {
  const { isAuthenticated, user, checkAuthentication } = useAuth();
  useEffect(() => {

    checkAuthentication();
  }, []);
  return (
<>
    {
        isAuthenticated ?
        <div className="grid grid-cols-2 max-sm:grid-cols-1 grid-rows-1">
        <div className='flex justify-center ml-80 max-sm:ml-0 mt-10'>
            <div className='h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow grid grid-cols-2'>
            
            { user ? 
                    <div key={user.id}>
                        
                        <img className='rounded-full overflow-visible object-cover h-32 w-32 border-[1px]' src={`http://127.0.0.1:8000/accounts${user.pfp}`}alt="" />
                        <p className='text-2xl font-semibold max-w-[10rem] mt-2'>{user.username}</p>
                        <p>{user.first_name}</p>
                        <p>{user.last_name}</p>
                    </div>
                    :
                null
            }

            <div className='ml-6 flex flex-col'>
                <Link to="/profile_edit">
                    <FaGear className='absolute ml-[8rem] max-sm:ml-[6rem]' size="22" />
                </Link>
                
                <p className='text-2xl font-bold'>Host</p>
                <p className='text-base'>Role</p>
                <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                <div className='flex items-center'>
                    <p className='text-2xl font-bold mr-1'>5</p> <FaStar color='orange' size="17" />
                </div>
                <p className='text-base'>Rating</p>
                <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                <p className='text-2xl font-bold'>1</p>
                <p className='text-base'>Reviews</p>
                <div className='border-b-[1px] rounded-full border-gray-400 my-2'></div>
                <p className='text-2xl font-bold'>0</p>
                <p className='text-base'>Years hosting</p>
            </div>
            </div>
        </div>
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
    :
    <Navigate to="/login" />
    }
</>



  )
}

export default ProfilePage
