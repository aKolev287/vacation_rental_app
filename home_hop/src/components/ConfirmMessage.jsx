import { useEffect } from "react";
import { useAuth } from "../hooks/authContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
const ConfirmMessage = ({
    fn,
    post,
    price,
    days,
    check_in,
    check_out,
    guests,
}) => {
    const { user, checkAuthentication } = useAuth();

    const sendReservation = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/posts/reserve/${post}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        days,
                        price,
                        check_in,
                        check_out,
                        guests,
                        post,
                    }),
                }
            );
            if (response.ok) {
                fn();
            }
            fn();
        } catch (error) {
            if (error) throw error;
        }
    };
    useEffect(() => {
        checkAuthentication();
    }, []);
    return (
        <>
            {user ? (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-400 opacity-75 z-20"></div>
                    <dialog
                        className="fixed top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 h-[26rem] w-[30rem] text-white p-8 rounded-md z-30"
                        open
                    >
                        <p className="mb-4 font-semibold text-3xl">
                            Do you want to make the reservation?
                        </p>
                        <div className="flex flex-col ">
                            <div className="flex justify-between">
                                <p className="mb-4 text-lg">Your reservation is for </p>
                                <span className="font-semibold text-xl">
                                    {guests > 1 ? `${guests} people` : `${guests} person`}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <p className="mb-4 text-lg">Your check-in date is </p>
                                <span className="font-semibold text-xl">{check_in}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="mb-4 text-lg">Your check-out date is </p>
                                <span className="font-semibold text-xl">{check_out}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="mb-4 text-lg">Your stay is </p>
                                <span className="font-semibold text-xl">
                                    {days > 1 ? `${days} days` : `${days} day`}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <p className="mb-4 text-lg">Total </p>
                                <span className="font-semibold text-xl">{price}$</span>
                            </div>
                        </div>

                        <form method="dialog">
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="text-gray-800 py-2 px-4 uppercase rounded bg-white hover:bg-gray-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    onClick={sendReservation}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="text-white py-2 px-4 uppercase rounded bg-red-600 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    onClick={fn}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </dialog>
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

ConfirmMessage.propTypes = {
    post: PropTypes.string,
    fn: PropTypes.func,
    price: PropTypes.number,
    days: PropTypes.number,
    check_in: PropTypes.string,
    check_out: PropTypes.string,
    guests: PropTypes.number,
  };
export default ConfirmMessage;
