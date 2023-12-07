import { FaStar,  FaCircleRight  } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ProfileComments = ({ comment }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FaStar
              key={i}
              size="18"
              color={i <= comment.review ? 'orange' : 'gray'} // Change color based on the review
            />
          );
        }
        return stars;
      };
  return (
    <div className='h-68 max-h-80 w-96 max-sm:w-80 rounded-xl p-5 card-shadow flex items-center justify-between'>
    <div>
      <div className='flex items-center'>
      {renderStars()}
    <p className="ml-2 font-semibold">{comment.review}</p>
      </div>
      <p className="font-semibold">{comment.comment}</p>
    </div>
    <Link to={`/rooms/${comment.post}`}>
      <FaCircleRight size="22"/>
    </Link>
  </div>
  )
}
ProfileComments.propTypes = {
    comment: PropTypes.object.isRequired

};
export default ProfileComments