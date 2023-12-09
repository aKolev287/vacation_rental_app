import {
  FaBars,
  FaRegUser,
  FaMagnifyingGlass,
  FaBarsStaggered,
  FaDoorOpen,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/authContext";
import { Link } from "react-router-dom";
import MiniBar from "./MiniBar";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated, checkAuthentication } = useAuth();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    checkAuthentication();
  }, []);
  return (
    <>
      <div className="border-[1px] h-20 flex justify-between items-center px-3">
        <Link className="flex items-center" to="/">
          <span className=" sr-only">Home page</span>
          <img className="h-28" src="/tent.png" alt="" />
        </Link>
        <div className="flex items-center max-sm:hidden">
          <input
            className="bg-gray-100 py-2 pl-8 w-96 pr-8 rounded-s-full focus:outline-none focus:shadow-lg"
            type="text"
            placeholder="Search"
          />
          <button className="bg-gray-800 py-[0.55rem] px-3 rounded-r-full hover:bg-gray-600">
            <span className=" sr-only">Search</span>
            <FaMagnifyingGlass className=" " color="white" size="23" />
          </button>
        </div>
        <div className="flex items-center">
          {!isAuthenticated ? (
            <Link
              className="mr-2 p-2 border-[1px] rounded-full border-gray-300 hover:shadow-lg hover:bg-gray-100 cursor-pointer"
              to="/register"
            >
              <span className=" sr-only">Register</span>
              <FaDoorOpen size="23" />
            </Link>
          ) : (
            <Link
              className="mr-2 p-2 border-[1px] rounded-full border-gray-300 hover:shadow-lg hover:bg-gray-100 cursor-pointer"
              to="/profile"
            >
              <span className=" sr-only">Profile</span>
              <FaRegUser size="23" />
            </Link>
          )}

          <motion.button
            onClick={toggleMenu}
            className={`p-2 border-[1px] rounded-full border-gray-300 hover:shadow-md hover:bg-gray-100 cursor-pointer`}
            animate={{
              rotate: isOpen ? 45 : 0,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 20,
              },
            }}
          >
            {isOpen ? <FaBarsStaggered size="23" /> : <FaBars size="23" />}
            <span className=" sr-only">Menu</span>
          </motion.button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          animate={{
            height: isOpen ? "100%" : 0,
            opacity: isOpen ? 1 : 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 20,
              easeInOut: true,
            },
          }}
        >
          <BurgerMenu />
        </motion.div>
      )}
    </>
  );
};

const BurgerMenu = () => {
  return <MiniBar />;
};

export default NavBar;
