import { Link } from "react-router-dom";
import { FaStar, FaGear } from "react-icons/fa6";
import PropTypes from "prop-types";
const UserPostsCard = ({
  link,
  location,
  image,
  rating,
  updatable,
  editLink,
}) => {
  return (
    <>
      <div className=" border-x-[1px] border-b-[1px] w-[18rem] h-72 rounded-xl">
        {updatable ? (
          <Link to={editLink} className="">
            <span className=" sr-only">Edit post</span>
            <FaGear
              className="absolute ml-[15rem] max-sm:ml-[6rem] bg-white rounded-full p-2 mt-2"
              size="40"
            />
          </Link>
        ) : null}
        <Link to={link}>
          <img
            className="object-cover h-56 w-full rounded-xl"
            src={image}
            alt=""
          />
          <div className="flex justify-between p-3">
            <p className="font-semibold">{location}</p>
            <div className="flex items-center">
              <p className="font-semibold mx-1">{rating}</p>
              <FaStar color="orange" size="17" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
UserPostsCard.propTypes = {
  link: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  updatable: PropTypes.bool,
  editLink: PropTypes.string,
};
export default UserPostsCard;
