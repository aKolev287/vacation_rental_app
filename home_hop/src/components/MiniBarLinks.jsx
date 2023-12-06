import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MiniBarLinks = ({tag, icon, text}) => {
  return (
    <Link to={`/filtered_posts?tags=${tag}`} className="flex flex-col items-center mx-5 hover:border-b-2 border-black">
        {icon}
        <p>{text}</p>
    </Link>
  )
}
MiniBarLinks.propTypes = {
    icon: PropTypes.node.isRequired,
    tag: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default MiniBarLinks
