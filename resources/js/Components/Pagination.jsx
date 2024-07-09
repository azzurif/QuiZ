;
import { Link } from "@inertiajs/react";
import { decode } from "html-entities";

const Pagination = ({ links }) => {
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-gray-400 focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-gray-400 focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 3 && (
            <div className="flex flex-wrap justify-center mt-8">
                {links.map(
                    (link, key) =>
                        link.url && (
                            <Link
                                className={getClassName(link.active)}
                                href={link.url}
                                key={key}
                            >
                                {decode(link.label)}
                            </Link>
                        )
                )}
            </div>
        )
    );
};

export default Pagination;
