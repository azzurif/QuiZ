;

const Header = ({ children, className }) => {
    return (
        <h2
            className={`font-semibold text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-tight ${className}`}
        >
            {children}
        </h2>
    );
};

export default Header;
