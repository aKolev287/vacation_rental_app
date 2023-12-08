import { useState } from 'react'
import { Link, Navigate  } from "react-router-dom";
import { FaUnlock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import PostFormField from '../components/PostFormField';
const SignIn = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [seePasswords, setSeePasswords] = useState("password");

    const handleLogin = async () => {

        try {
            const res = await fetch("http://127.0.0.1:8000/accounts/login/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
              });
              if (res.ok){
                setShouldRedirect(true)
              }
        } catch (error) {
            if (error) throw error
            console.error("Login failed", error);
        }
      };


    return (
        <div className=" p-8 lg:w-1/3 mx-auto z-10">
        <div className="bg-gray-800 rounded-lg py-12 px-4 lg:px-24">

        <p className="text-center text-2xl text-white font-light">
            Sign in with credentials
        </p>
        <div className="mt-6">
        <PostFormField type="email" placeholder="Email" func={(e) => setEmail(e.target.value)} icon={<FaEnvelope className="ml-3" color="gray" size="20" />} />

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
            <div className="flex items-center justify-center mt-4">
                <button
                    className="text-gray-800 py-2 px-4 uppercase rounded bg-white hover:bg-gray-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    onClick={handleLogin}
                >
                    Sign in
                </button>
            </div>
        </div>
        <p className="text-center mt-2 text-lg text-white font-light">
                No account? Sign up <Link className="text-blue-300 hover:text-blue-500" to="/register">here</Link>
            </p>
      
    </div>
    {shouldRedirect && <Navigate replace to="/" />}
    </div>
    )
}

export default SignIn