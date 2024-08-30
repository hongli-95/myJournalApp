"use client";

import { useEffect, useState } from "react";
import IconSearch from "./IconSearch";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("");

	// delay submit, wait until user finishes typing
	const [query] = useDebounce(searchTerm, 300);
	const router = useRouter();

	useEffect(() => {
		if (!query) {
			router.push("/entries");
		} else {
			router.push(`?search=${query}`);
		}
	}, [query, router]);

	return (
		<div className="flex justify-center items-center flex-row rounded-lg md:absolute right-4">
			<input
				type="text"
				name="searchTerm"
				id="searchTerm"
				onChange={(e) => setSearchTerm(e.target.value)}
				className="rounded-l-lg outline-none w-full p-2 bg-white bg-opacity-60 peer
                focus-visible:shadow-inner focus-visible:bg-opacity-90
                transition-all"
			/>
			<button
				type="button"
				disabled
				className="p-3 bg-white bg-opacity-60 rounded-lg outline-none rounded-r-lg rounded-l-none border-none md:py-3 md:px-2
                    peer-focus-visible:bg-opacity-90
                    transition-all duration-200"
			>
				<IconSearch />
			</button>
		</div>
	);
}
