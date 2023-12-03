import React from 'react'
import { FaTelegram, FaInstagram, FaXTwitter, FaGithub} from "react-icons/fa6";
const Footer = () => {
    const year = new Date().getFullYear();

  return (
<footer className="bg-gray-900 border-t-[1px]">
    <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-white hover:text-gray-300">
                    About
                </a>
            </div>
            <div className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-white hover:text-gray-300">
                    News
                </a>
            </div>
            <div className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-white hover:text-gray-300">
                    Contact
                </a>
            </div>
            <div className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-white hover:text-gray-300">
                    Terms
                </a>
            </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
            <a href="#" className="text-white hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <FaInstagram size="22"/>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <FaXTwitter size="22"/>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <FaGithub size="22"/>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
                <span className="sr-only">Telegram</span>
                <FaTelegram size="22"/>
            </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-300">
            © {year} All rights reserved.
        </p>
    </div>
</footer>
  )
}

export default Footer
