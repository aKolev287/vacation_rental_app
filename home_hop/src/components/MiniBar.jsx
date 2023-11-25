import { FaBuilding, FaHouseChimney, FaIgloo, FaLandmarkFlag, FaMountain, FaSeedling, FaTree } from "react-icons/fa6";

const MiniBar = () => {
  return (
    <div className='my-2 left-0 h-[4rem] text-center items-center p-2'>
      <div className='flex justify-center '>
      <div className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
          <FaHouseChimney className="" size="23" />
          <p>Houses</p>
      </div>
      <div className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
          <FaBuilding className="" size="23" />
          <p>Apartment</p>
      </div>
      <div className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
          <FaIgloo className="" size="23" />
          <p>Unusual</p>
      </div>
      <div className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
          <FaLandmarkFlag className="" size="23" />
          <p>Iconic cities</p>
      </div>
      <div className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
          <FaMountain className="" size="23" />
          <p>Mountain</p>
      </div>
      <div className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
          <FaSeedling className="" size="23" />
          <p>New</p>
      </div>
      <div className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
          <FaTree className="" size="23" />
          <p>Forest</p>
      </div>
      </div>
    </div>
  )
}

export default MiniBar
