import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";

const Comments = ({ post }) => {
  
  const renderStars = (comment) => {
    console.log(comment)
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
    <div className="flex flex-col gap-4  rounded-lg shadow-lg border-[1px] p-4  mt-5">
    {post?.comments?.map((cmt) => (
      <div
        key={cmt.id}
        className="bg-white  flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 ">
          <img
            src={`http://127.0.0.1:8000/accounts${cmt.user.pfp}`}
            alt={cmt.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-bold">{cmt.user.username}</p>
        </div>
        <div className="flex items-center gap-1">
        {renderStars(cmt)}
        </div>
        <p className="text-gray-700">{cmt.comment}</p>
      </div>
    ))}
  </div>
  )
}

Comments.propTypes = {
    post: PropTypes.object.isRequired,
}

export default Comments
