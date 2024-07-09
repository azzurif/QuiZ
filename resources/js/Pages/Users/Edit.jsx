import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";

const Edit = ({ auth, user }) => {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        password: "",
    });

    const editUser = (e) => {
        e.preventDefault();

        put(route("users.update", user.id), data);
    };

    return (
        <Layout auth={auth.user} header={`Edit ${user.name}`} title="Edit User">
            <form onSubmit={editUser} className="mt-6 space-y-6">
                {/* name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
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
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        type="email"
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </form>
        </Layout>
    );
};

export default Edit;
