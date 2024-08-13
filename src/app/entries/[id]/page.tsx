import DateBlock from "@/components/DateBlock";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SingleEntry({
	params: { id },
}: {
	params: { id: string };
}) {
	const { isAuthenticated } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();
	if (!isLoggedIn) {
		redirect("/api/auth/login");
	}

	// fetch entry from db based on id
	const entry = await prisma.entry.findUnique({
		where: {
			id: id,
		},
	});

	return (
		<div className="flex flex-col justify-center items-center gap-4 h-full">
			<div className="flex flex-row justify-center items-center w-full">
				<Link
					href="/entries"
					className="mr-auto bg-slate-600 text-white p-2 rounded-md 
							hover:bg-slate-400 hover:scale-105 
							focus-visible:bg-slate-400 focus-visible:scale-105 
							active:scale-95 transition-all"
				>
					Back
				</Link>
				<div className="flex-1 flex justify-center">
					<h1 className="text-xl font-bold">{entry?.title}</h1>
				</div>
				<div className="flex gap-4 mx-2">
					<Link
						href={`/entries/${id}/edit`}
						className="bg-blue-500 text-white p-2 rounded-md 
									hover:bg-red-400 hover:scale-105 
									focus-visible:bg-red-400 focus-visible:scale-105 
									active:scale-95 active:hover:bg-red-400 transition-all"
					>
						Edit / Delete
					</Link>
				</div>
			</div>

			<div className="w-full md:w-5/6 whitespace-pre-wrap">
				<div className="w-max bg-white bg-opacity-70 p-2 rounded-md my-1 text-lg cursor-default">
					<span>
						<DateBlock createdAt={entry?.createdAt} />
					</span>
					I am feeling
					{/* i don't like these lol */}
					{entry?.mood === "happy" ? (
						<span> &#128513; {entry.mood}</span>
					) : entry?.mood === "fine" ? (
						<span> &#128522; {entry.mood}</span>
					) : entry?.mood === "meh" ? (
						<span> &#128529; {entry.mood}</span>
					) : entry?.mood === "tolerable" ? (
						<span> &#128533; {entry.mood}</span>
					) : entry?.mood === "awful" ? (
						<span> &#128555; {entry.mood}</span>
					) : (
						"no"
					)}{" "}
					today.
				</div>
				<p className="flex-1">{entry?.body}</p>
				<div className="flex justify-center md:justify-end">
					{entry?.imagePath && (
						<Image
							alt={`picture-${entry?.imagePath}`}
							src={entry?.imagePath as string}
							height={400}
							width={400}
							className="rounded-md drop-shadow-md"
						></Image>
					)}
				</div>

				<div className="mb-auto self-start border-slate-500 border-t-[1px] mt-2">
					{entry?.updatedAt.toString() !== entry?.createdAt.toString() ? (
						<div className="text-slate-500 text-sm">
							Last Updated:{" "}
							<span className="inline-block">
								<DateBlock updatedAt={entry?.updatedAt as Date} />
							</span>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
