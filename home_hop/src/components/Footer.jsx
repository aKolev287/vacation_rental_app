import { FaTelegram, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t-[1px] mt-5">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <Link
              to="/about"
              className="text-base leading-6 text-white hover:text-gray-300"
            >
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/terms"
              className="text-base leading-6 text-white hover:text-gray-300"
            >
              Terms
            </Link>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="text-white hover:text-gray-300">
            <span className="sr-only">Instagram</span>
            <FaInstagram size="22" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <FaXTwitter size="22" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <span className="sr-only">GitHub</span>
            <FaGithub size="22" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <span className="sr-only">Telegram</span>
            <FaTelegram size="22" />
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-300">
          © {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
