import PropTypes from "prop-types";
const PostFormField = ({ icon, type, placeholder, func, accept, value, disabled }) => {
    return (
        <div className="relative mt-3">
            <div className="absolute left-0 inset-y-0 flex items-center">{icon}</div>
            <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type={type}
                placeholder={placeholder}
                accept={accept}
                value={value}
                onChange={func}
                disabled={disabled}
                
            />
        </div>
    );
};

PostFormField.propTypes = {
    icon: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    func: PropTypes.func,
    accept: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
    ]),
    disabled: PropTypes.bool
};
export default PostFormField;
