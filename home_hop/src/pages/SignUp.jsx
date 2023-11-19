import { useState} from 'react';
import { FaUnlock, FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seePasswords, setSeePasswords] = useState("password");
  const navigate = useNavigate();

  const checkPassword = async () => {
    if (password === confirmPassword) {
      await handleRegister()
    } else {
      console.log("Invalid password")
    }
  }
  const handleRegister = async () => {
    const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ username, email, password }),
    });
  
    if (response.ok) {
      console.log("Registration successful");
      navigate("/login");
      
    } else {
      console.error("Registration failed");
    }
  };
  return (
    <div className="p-8 lg:w-1/3 mx-auto z-10">
      <div className="bg-gray-800 rounded-lg py-12 px-4 lg:px-24">

        <p className="text-center text-2xl text-white font-light">
          Sign Up with credentials
        </p>
        <div className="mt-6">
          <div className="relative">
            <input
              className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="absolute left-0 inset-y-0 flex items-center">
              <FaEnvelope className="ml-3" color="gray" size="20" />
            </div>
          </div>
          <div className="relative mt-3">
          <div className="absolute left-0 inset-y-0 flex items-center">
              <FaUser className="ml-3" color="gray" size="20" />
            </div>
            <input
              className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mt-3">
            <input
              className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type={seePasswords}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute left-0 inset-y-0 flex items-center">
              <FaUnlock className="ml-3" color="gray" size="20" />
            </div>
            <div className="absolute right-0 inset-y-0 flex items-center" onClick={() => { seePasswords === "password" ? setSeePasswords("text") : setSeePasswords("password") }}>
              {seePasswords === "password" ?
                <FaEye className="mr-3" color="gray" size="20" />
                :
                <FaEyeSlash className="mr-3" color="gray" size="20" />
              }

            </div>
          </div>
          <div className="relative mt-3">
          <div className="absolute left-0 inset-y-0 flex items-center">
              <FaUnlock className="ml-3" color="gray" size="20" />
            </div>
            <input
              className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type={seePasswords}
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="text-gray-800 py-2 px-4 uppercase rounded bg-white hover:bg-gray-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={checkPassword}
            >
              Sign Up
            </button>
          </div>
        </div>
        <p className="text-center mt-2 text-lg text-white font-light">
          Already a user? Sign in <Link className="text-blue-300 hover:text-blue-500" to="/login">here</Link>
        </p>
      </div>

    </div>
  )
}

export default SignUp
