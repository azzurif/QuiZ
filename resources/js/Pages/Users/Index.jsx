import React from "react";
import Layout from "../../Layouts/Layout";
import { Link, router } from "@inertiajs/react";
import { PencilSimple, XCircle } from "@phosphor-icons/react";
import CreateButton from "@/Components/CreateButton";

const Index = ({ auth, users }) => {
    const deleteUser = (id) => {
        router.delete(route("users.destroy", id));
    };

    return (
        <Layout auth={auth.user} header="UserMan" title="UserMan">
            {auth.users.permissions
                .map((permission) => permission.name)
                .includes("create users") && (
                <CreateButton href={route("users.create")}>
                    Create User
                </CreateButton>
            )}
            <div className="grid grid-cols-2 w-full gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex justify-evenly items-center border border-green-400 py-1"
                    >
                        <Link href={route("users.show", user)}>
                            {user.name}
                        </Link>
                        {auth.users.permissions
                            .map((permission) => permission.name)
                            .includes("edit users" && "delete users") && (
                            <div className="flex items-center gap-2">
                                <button onClick={() => deleteUser(user.id)}>
                                    <XCircle size={32} color="blue" />
                                </button>
                                <Link href={route("users.edit", user)}>
                                    <PencilSimple sizez={40} />
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Index;
