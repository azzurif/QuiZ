import Card from "@/Components/Quiz/Card";
import Layout from "@/Layouts/Layout";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Index = ({ auth, quizzes }) => {
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        router.get(route(route().current()), { s: search });
    };

    const handleReset = () => {
        router.get(route(route().current()));
    };

    return (
        <Layout
            auth={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    Quizzes
                    <div className="flex items-center gap-2">
                        <TextInput
                            id="search"
                            className="w-auto block"
                            placeholder="Search Quiz"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button onClick={handleSearch}>
                            <MagnifyingGlass size={24} />
                        </button>
                        <button
                            onClick={handleReset}
                            className="text-base font-normal"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            }
            title="Quizzes"
        >
            <Card quizzes={quizzes.data} show={false} />
            <Pagination links={quizzes.links} />
        </Layout>
    );
};

export default Index;
