import { Link } from 'react-router-dom'
import { FaLocationDot, FaStar, FaDollarSign, FaCalendarDay } from "react-icons/fa6";
import PropTypes from "prop-types";

const FrontPageCards = ({id, image, location, rating, description, price, date}) => {
  return (
    <Link to={`/rooms/${id}`} >
    <div  className="border-b-[1px] border-x-[1px] rounded-xl shadow-lg flex flex-col w-[20rem] mx-8 mt-10">
      <img className="w-full h-60 object-cover rounded-lg" src={image} srcSet="" alt="" />
      <div className="p-2">
        <div className="flex justify-between pr-2 mt-2">
          <div className="flex items-center text-lg ">
            <FaLocationDot size="16"/><p className="ml-1 font-semibold">{location}</p>
          </div>
          <div className="flex items-center text-lg">
          <FaStar color='orange' size="16" /><p className="ml-1 font-semibold" >{rating}</p>
          </div>
        </div>

        <div className="flex justify-between pr-2 mt-2">
          <div className="flex items-center text-sm ml-1 ">
            <p className="font-medium text-gray-600">{description}...</p>
          </div>
        </div>
       
        <div className="flex justify-between pr-2 mt-2">
          <div className="flex items-center text-lg ">
            <FaDollarSign size="16"/><p className="font-semibold">{price}/night</p>
          </div>
          <div className="flex items-center text-sm ">
            <FaCalendarDay size="13"/><p className="ml-1 font-semibold">{date}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}
FrontPageCards.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
}
export default FrontPageCards
