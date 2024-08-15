import DateStripe from "@/components/DateStripe";
import { MotionDiv } from "@/components/MotionDiv";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
					className="mr-auto bg-slate-600 text-white p-2 rounded-md absolute top-3 left-3 z-50
							hover:bg-slate-400 hover:scale-105 
							focus-visible:bg-slate-400 focus-visible:scale-105 
							active:scale-95 transition-all"
				>
					Back
				</Link>

				{/* entry title */}
				<MotionDiv
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="flex-1 flex justify-center"
				>
					<h1 className="text-2xl font-semibold">{entry?.title}</h1>
				</MotionDiv>

				{/* Edit / Delete button */}
				<div className="flex gap-4 mx-2">
					<Link
						href={`/entries/${id}/edit`}
						className="bg-transparent text-white p-2 rounded-md border-2 border-white
									hover:bg-white hover:text-black hover:scale-105 
									focus-visible:bg-white focus-visible::text-black focus-visible:scale-105 
									active:scale-95 active:hover:bg-red-400 transition-all"
					>
						Edit / Delete
					</Link>
				</div>
			</div>

			<div className="w-full md:w-5/6 whitespace-pre-wrap">
				<MotionDiv
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.1 }}
					className="w-max bg-white bg-opacity-70 p-2 rounded-md my-1 text-lg cursor-default"
				>
					<span>
						<DateStripe createdAt={entry?.createdAt} />
					</span>
					I am feeling
					{/* i don't like these lol */}
					{entry?.mood === "fantastic" ? (
						<span> &#128513; {entry.mood}</span>
					) : entry?.mood === "good" ? (
						<span> &#128522; {entry.mood}</span>
					) : entry?.mood === "alright" ? (
						<span> &#128529; {entry.mood}</span>
					) : entry?.mood === "awful" ? (
						<span> &#128555; {entry.mood}</span>
					) : null}{" "}
					{""}
					today.
				</MotionDiv>

				<MotionDiv
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					{" "}
					<p className="flex-1 leading-7">{entry?.body}</p>
				</MotionDiv>

				{/* <div className="flex justify-center md:justify-end">
					{entry?.imagePath && (
						<Image
							alt={`picture-${entry?.imagePath}`}
							src={entry?.imagePath as string}
							height={400}
							width={400}
							className="rounded-md drop-shadow-md border-2"
						></Image>
					)}
				</div> */}

				<MotionDiv
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="mb-auto self-start border-slate-500 border-t-[1px] mt-2"
				>
					{entry?.updatedAt.toString() !== entry?.createdAt.toString() ? (
						<div className="text-slate-500 text-sm">
							Last Updated:{" "}
							<span className="inline-block">
								<DateStripe updatedAt={entry?.updatedAt as Date} />
							</span>
						</div>
					) : null}
				</MotionDiv>
			</div>
		</div>
	);
}
