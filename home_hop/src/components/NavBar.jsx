import { FaBars, FaRegUser, FaMagnifyingGlass } from 'react-icons/fa6'

const NavBar = () => {
  return (
    <div className="border-[1px] h-20 flex justify-between items-center px-3">
      <div className='flex items-center'>
        <img className='h-28' src="/tent.png" alt="" />
      </div>
      <div className='flex items-center '>
        <input className='bg-gray-100 py-2 pl-8 w-96 pr-8 rounded-s-full focus:outline-none focus:shadow-lg' type="text" placeholder='Search' />
        <button className='bg-gray-800 py-[0.55rem] px-3 rounded-r-full hover:bg-gray-600'>
        <FaMagnifyingGlass className=' ' color='white' size="23" />
        </button>
      </div>
      <div className='flex items-center'>
        
        <div className='mr-2 p-2 border-[1px] rounded-full border-gray-300 hover:shadow-lg hover:bg-gray-100 cursor-pointer'>
          <FaRegUser size="23" />
        </div>
        <div className='p-2 border-[1px] rounded-full border-gray-300 hover:shadow-md hover:bg-gray-100 cursor-pointer'>
          <FaBars size="23" />
        </div>
        
        
      </div>
    </div>
  )
}

export default NavBar
