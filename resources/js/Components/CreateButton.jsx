import { Link } from "@inertiajs/react";
import React from "react";

const CreateButton = ({ href, children }) => {
    return (
        <Link
            href={href}
            className="bg-green-700 max-w-32 py-2 px-4 block text-center rounded-md mb-2"
        >
            {children}
        </Link>
    );
};

export default CreateButton;
