import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useRef, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Search = () => {
    const [search, setSearch] = useState("");
    const searchRef = useRef();

    const handleSearch = (e) => {
        const keyword = searchRef.current.value;

        if (!keyword || keyword.trim() == "") return;

        if (e.key === "Enter" || e.type === "click") {
            router.get(route(route().current()), { s: search });
        }
    };

    const handleReset = () => {
        router.get(route(route().current()));
    };

    return (
        <div className="flex items-center gap-2">
            <TextInput
                id="search"
                className="w-auto block"
                placeholder="Search Quiz"
                ref={searchRef}
                onKeyDown={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>
                <MagnifyingGlass size={24} />
            </button>
            <button onClick={handleReset} className="text-base font-normal">
                Reset
            </button>
        </div>
    );
};

export default Search;
