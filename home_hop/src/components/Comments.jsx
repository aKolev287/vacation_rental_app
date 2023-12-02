import { FaFaceSmile } from "react-icons/fa6";
import PropTypes from "prop-types";

const Comments = ({ post }) => {
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
        <FaFaceSmile size="20"/>
          <div className="w-16 h-2 bg-gray-300 rounded-full items-center">
            <div className={ cmt.review === 5 ? `w-[100%] h-full bg-green-500 rounded-full` : cmt.review === 4 ? 
            `w-[80%] h-full bg-green-300 rounded-full` : cmt.review === 3 ? `w-[50%] h-full bg-orange-500 rounded-full` : cmt.review === 2 ? `w-[30%] h-full bg-yellow-500 rounded-full` : `w-[10%] h-full bg-red-500 rounded-full`} />
          </div>
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
