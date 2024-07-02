import Layout from "@/Layouts/Layout";
import React from "react";

const Show = ({ auth, user }) => {
    return (
        <Layout auth={auth.user} header={user.name} title={user.name}>
            <h1 className="text-xl text-green-200">{user.name}</h1>
            <p className="text-lg">{user.email}</p>
            <p className="font-semibold">User: {auth.users.roles}</p>
        </Layout>
    );
};

export default Show;
