import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/authContext";
import { Link } from "react-router-dom";

const PostComment = ({ post, fn }) => {
  const { user, checkAuthentication } = useAuth();
  const [review, setReview] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null); // New state for error message

  const handleStarClick = (index) => {
    setReview(index + 1);
    setError(null); // Clear error when the user selects a star
  };

  const sendReview = async () => {
    if (review === 0) {
      setError("Please leave at least one star."); // Set error if no star is selected
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/posts/${post}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ comment, review, post }),
        }
      );

      if (response.ok) {
        fn();
        cancel();
      }
    } catch (err) {
      if (err) throw err;
    }
  };

  const cancel = () => {
    setComment("");
    setReview(0);
    setError(null); // Clear error when canceling
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-lg shadow-lg border-[1px] p-4">
      <h2 className="font-semibold text-xl">Leave a review</h2>
      {user ? (
        <>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const isStarSelected = index + 1 <= review;
              const starColor = isStarSelected ? "orange" : "black";

              return (
                <FaStar
                  key={index}
                  size="20"
                  color={starColor}
                  onClick={() => handleStarClick(index)}
                  className=" cursor-pointer"
                />
              );
            })}
          </div>
          <input
            className="border-b-[1px] py-1 text-lg focus:outline-none focus:border-black"
            type="text"
            value={comment}
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-3 justify-end mx-3">
            <button
              className="bg-red-600 text-white py-2 px-5 rounded-xl font-semibold"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              className="bg-gray-900 text-white py-2 px-5 rounded-xl font-semibold"
              onClick={sendReview}
            >
              Post
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg font-semibold">
          Please{" "}
          <Link className="text-gray-500 underline" to="/login">
            Login
          </Link>{" "}
          or{" "}
          <Link to="/register" className="text-gray-500 underline">
            Sign up
          </Link>{" "}
          to leave reviews
        </p>
      )}
    </div>
  );
};

PostComment.propTypes = {
  post: PropTypes.number,
  fn: PropTypes.func,
};

export default PostComment;
