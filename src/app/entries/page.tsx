import EntryCard from "@/components/EntryCard";
import { MotionDiv } from "@/components/MotionDiv";
import PaginationControl from "@/components/PaginationControl";
import SearchBar from "@/components/SearchBar";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Entries({
	searchParams,
}: {
	searchParams: { search: string; page: string };
}) {
	// check if a user is logged in
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();
	if (!isLoggedIn) {
		redirect("/api/auth/login");
	}

	const user = await getUser();

	//pagination
	const page = searchParams.page ?? "1";
	const perPage = 6;

	const start = (Number(page) - 1) * perPage; // start from 0, to 6, to 12...
	const end = start + perPage; // end on 6 perpage, 12, 18...

	// fetch searched entries
	// find entries that has the search term in their title OR body
	const searchedEntries = await prisma.entry.findMany({
		where: {
			KindeAuthId: user?.id as string,
			OR: [
				{
					body: {
						contains: searchParams.search,
					},
				},
				{
					title: {
						contains: searchParams.search,
					},
				},
			],
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	// fetch all entries
	const entries = await prisma.entry.findMany({
		where: {
			KindeAuthId: user?.id as string,
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	const pagedEntries = entries.slice(start, end);

	return (
		<div className="flex flex-col gap-2 flex-wrap">
			{/* top row: title and search bar*/}
			<div className="flex flex-col justify-center items-center md:flex-row">
				<div className="flex-1 flex justify-center items-center relative">
					<h1 className="text-2xl text-center text-white font-semibold p-2">
						Your Journal
					</h1>
				</div>

				{/* search bar */}
				<SearchBar />
			</div>

			{/* back button */}
			<Link
				href="/"
				className="bg-slate-600 text-white p-2 rounded-md absolute top-3 left-3 z-50
					hover:bg-slate-400 hover:scale-105 
                    focus-visible:bg-slate-400 focus-visible:scale-105 
					active:scale-95 transition-all"
			>
				Back
			</Link>

			<MotionDiv
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-row flex-wrap justify-around gap-4"
			>
				{searchedEntries.length !== 0 ? (
					// if searched
					searchedEntries.map((entry) => (
						<div
							key={entry.id}
							className="my-3 w-full md:w-[40%] lg:w-[30%]
											active:scale-[0.99] transition-all "
						>
							<Link
								title={entry.title}
								href={`/entries/${entry.id}`}
								className="group h-full w-full"
							>
								<EntryCard {...entry} />
							</Link>
						</div>
					))
				) : // if searched, but none matched
				searchedEntries.length === 0 && searchParams.search ? (
					<div className="flex flex-col justify-center items-center gap-4 self-center translate-y-1/2">
						<h1 className="text-xl text-white">Nothing found...</h1>
					</div>
				) : // if none searched, show all
				searchedEntries.length === 0 && entries.length !== 0 ? (
					pagedEntries.map((entry) => (
						<div
							key={entry.id}
							className="my-3 w-full md:w-[40%] lg:w-[30%]
											active:scale-[0.99] transition-all "
						>
							<Link
								title={entry.title}
								href={`/entries/${entry.id}`}
								className="group h-full w-full"
							>
								<EntryCard {...entry} />
							</Link>
						</div>
					))
				) : (
					<div className="flex flex-col justify-center items-center gap-4 self-center translate-y-1/2">
						<h1 className="text-xl">You have no journal entries.</h1>
						<h1 className="text-lg">
							Would you like to
							<Link
								href="/newEntryForm"
								className="bg-transparent border-2 border-white p-3 mx-3 rounded-lg text-white hover:scale-105 
						hover:bg-white hover:shadow-md hover:text-black 
						focus-visible:scale-105 focus-visible:bg-white focus-visible:text-black
						transition-all inline-block active:scale-95"
							>
								Create a New Entry
							</Link>
							?
						</h1>
					</div>
				)}
			</MotionDiv>

			<MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
				<PaginationControl
					perPage={perPage}
					hasPrevPage={start > 0}
					hasNextPage={end < pagedEntries.length}
				/>
			</MotionDiv>

			<MotionDiv
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-row justify-center items-center"
			>
				{entries.length !== 0 ? (
					<Link
						href="/newEntryForm"
						className="border-2 border-white bg-transparent p-3 text-xl my-6 rounded-lg w-5/6 self-center flex justify-center text-white text-center
								md:w-1/2 
									lg:w-1/3 
										hover:scale-105 hover:bg-emerald-400 hover:shadow-md 
                    						focus-visible:scale-105 focus-visible:bg-emerald-400 
												active:scale-95 transition-all"
					>
						Create a New Entry
					</Link>
				) : null}
			</MotionDiv>
		</div>
	);
}
