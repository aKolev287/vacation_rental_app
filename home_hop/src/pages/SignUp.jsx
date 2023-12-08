import { useState } from 'react';
import { FaUnlock, FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostFormField from '../components/PostFormField';
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
        <div className="mt-3">
          <PostFormField type="email" placeholder="Email" func={(e) => setEmail(e.target.value)} icon={<FaEnvelope className="ml-3" color="gray" size="20" />} />
          <PostFormField type="text" placeholder="Username" func={(e) => setUsername(e.target.value)} icon={<FaUser className="ml-3" color="gray" size="20" />} />
          <div>
            <div className="relative z-20">
              <div className="absolute right-0 inset-y-6 flex items-center" onClick={() => { seePasswords === "password" ? setSeePasswords("text") : setSeePasswords("password") }}>
                {seePasswords === "password" ?
                  <FaEye className="mr-3" color="gray" size="20" />
                  :
                  <FaEyeSlash className="mr-3" color="gray" size="20" />
                }
              </div>
            </div>
            <PostFormField
              type={seePasswords}
              placeholder="Password"
              func={(e) => setPassword(e.target.value)}
              icon={<FaUnlock className="ml-3" color="gray" size="20" />}
            />
          </div>

          <PostFormField
            type={seePasswords}
            placeholder="Password"
            func={(e) => setConfirmPassword(e.target.value)}
            icon={<FaUnlock className="ml-3" color="gray" size="20" />}
          />

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
