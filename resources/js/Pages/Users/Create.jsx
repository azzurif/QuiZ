import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";
import React from "react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const createUser = (e) => {
      e.preventDefault()

      post(route("users.store"))
    }

    return (
        <Layout auth={auth.user} header="Create User" title="Create user">
            <form onSubmit={createUser} className="space-y-6">
              {/* name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        placeholder="Your name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        isFocused
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                {/* email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        placeholder="email@example.com"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        type="email"
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                {/* password */}
                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        placeholder="Your password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        required
                    />

                    <InputError className="mt-2" message={errors.password} />
                </div>
                <PrimaryButton disabled={processing}>Create User</PrimaryButton>
            </form>
        </Layout>
    );
};

export default Create;
