"use client";

import { useRouter, useSearchParams } from "next/navigation";

type PaginationControlPropsType = {
	perPage: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
};

function PaginationControl({ perPage }: PaginationControlPropsType) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";

	return (
		<div className="flex flex-row justify-center items-center text-white gap-8">
			<button
				onClick={() => {
					router.push(`/entries/?page=${Number(page) - 1}`);
				}}
				className="bg-white bg-opacity-50 p-2 rounded-md hover:bg-opacity-80 hover:text-black focus-visible:bg-opacity-80 focus-visible:text-black transition-all"
			>{`<<`}</button>
			<div>
				<p>
					{Number(page)} / {Math.ceil(10 / perPage)}
				</p>
			</div>
			<button
				onClick={() => {
					router.push(`/entries/?page=${Number(page) + 1}`);
				}}
				className="bg-white bg-opacity-50 p-2 rounded-md hover:text-black focus-visible:bg-opacity-80 focus-visible:text-black transition-all"
			>{`>>`}</button>
		</div>
	);
}

export default PaginationControl;
