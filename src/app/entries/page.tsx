import EntryCard from "@/components/EntryCard";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Entries() {
	// check if a user is logged in
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();
	if (!isLoggedIn) {
		redirect("/api/auth/login");
	}

	const user = await getUser();

	const entries = await prisma.entry.findMany({
		where: {
			KindeAuthId: user?.id as string,
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	return (
		<div className="flex flex-col gap-2">
			{/* top row: back button and page title */}
			<div className="flex flex-row justify-center items-center">
				<Link
					href="/"
					className="mr-auto bg-slate-600 text-white p-2 rounded-md hover:bg-slate-400 hover:scale-105 
                    focus-visible:bg-slate-400 focus-visible:scale-105 active:scale-95 transition-all"
				>
					Back
				</Link>
				<div className="flex-1 flex justify-center items-center">
					<h1 className="text-2xl text-center text-slate-700 p-2 rounded-md">
						Your Journal
					</h1>
				</div>
			</div>

			<div className="flex flex-row flex-wrap justify-center items-center">
				{entries.length === 0 ? (
					// if there is no entry
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
				) : (
					// if entry exists
					<div className="flex flex-row flex-wrap w-full">
						{entries.map((entry) => (
							<div
								key={entry.id}
								className="my-3 w-full md:w-1/3 lg:w-1/5 
								active:scale-[0.99] transition-all "
							>
								<Link
									href={`/entries/${entry.id}`}
									className="group h-full w-full"
								>
									<EntryCard {...entry} />
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
			{entries.length !== 0 ? (
				<Link
					href="/newEntryForm"
					className="border-2 border-white bg-transparent p-3 text-xl my-6 rounded-lg w-full md:w-1/2 lg:w-1/3 self-center flex justify-center text-white 
					hover:scale-105 hover:bg-emerald-400 hover:shadow-md 
                    focus-visible:scale-105 focus-visible:bg-emerald-400 
					active:scale-95 transition-all "
				>
					Create a New Entry
				</Link>
			) : null}
		</div>
	);
}
