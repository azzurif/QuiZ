import React from "react";
import Authenticated from "./AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Layout = ({ auth, header, title, children }) => {
    return (
        <Authenticated
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {header}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Layout;
