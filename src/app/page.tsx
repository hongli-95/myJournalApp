import Link from "next/link";
import {
	NotebookPen,
	FolderCheck,
	KeyRound,
	LogIn,
	PencilLine,
	Lightbulb,
} from "lucide-react";

import {
	getKindeServerSession,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

import { MotionDiv } from "@/components/MotionDiv";
import Image from "next/image";

export default async function Home() {
	const { isAuthenticated } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	return (
		<>
			<main className="flex flex-col">
				<div className="flex flex-col justify-center items-center w-full lg:flex-row mt-20 md:mt-12 mb-12 h-96 md:h-[35rem]">
					<MotionDiv
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="flex flex-col gap-6 justify-center items-center my-4 flex-1 z-10 relative "
					>
						<h1 className="text-3xl text-white drop-shadow-md">
							Welcome to Journey Space
						</h1>
						<h2 className="text-white">
							Capture Your Thoughts. Anywhere. Anytime.
						</h2>
						{isLoggedIn ? (
							<Link
								href="/entries"
								className="w-full md:w-1/3 text-center border-2 border-white text-xl bg-transparent p-3 rounded-md text-white 
						hover:shadow-md hover:scale-105 hover:text-xl hover:bg-white hover:text-black
         				focus-visible:bg-white focus-visible:text-black focus-visible:shadow-md focus-visible:scale-105 
						active:scale-95 transition-all"
							>
								Go to your Journal
							</Link>
						) : (
							<RegisterLink
								className="w-full lg:w-1/2 text-center border-2 border-white text-xl bg-transparent p-3 rounded-md text-white 
						hover:shadow-md hover:scale-105 hover:text-xl hover:bg-white hover:text-black
         				focus-visible:bg-white focus-visible:text-black focus-visible:shadow-md focus-visible:scale-105 
						active:scale-95 transition-all"
							>
								Join Today
							</RegisterLink>
						)}
					</MotionDiv>

					{/* <MotionDiv
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="flex flex-row gap-3 justify-center w-full translate-y-20 mb-20
				md:w-5/6 
				lg:w-1/2 lg:-translate-x-20 lg:translate-y-8"
					>
						<Image
							src={homepageImage}
							alt="homepage journal image"
							className="w-[60%] rounded-lg"
						></Image>
					</MotionDiv> */}
				</div>

				{/* how it works section */}
				<div className="flex flex-col justify-center items-center gap-6 mb-24">
					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="w-5/6 md:w-2/3"
					>
						<h2 className="text-2xl font-semibold text-white">
							Get started today.
						</h2>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="flex flex-row justify-start items-center gap-4 bg-white bg-opacity-60 p-4 rounded-lg w-5/6 
										md:w-2/3
										hover:bg-opacity-80 
										focus-visible:bg-opacity-80 
										transition-all
										"
					>
						<div className="flex flex-col justify-center items-center gap-2 p-2">
							<LogIn size={60} strokeWidth={2} absoluteStrokeWidth={true} />
							<p className="text-lg font-semibold">Sign Up</p>
						</div>

						<p className="text-lg">
							Create your account in seconds, or use your google accounts to
							sign in.
						</p>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="flex flex-row justify-start items-center gap-4 bg-white bg-opacity-60 p-4 rounded-lg w-5/6 
										md:w-2/3
										hover:bg-opacity-80 
										focus-visible:bg-opacity-80 
										transition-all"
					>
						<div className="flex flex-col justify-center items-center gap-2 p-2">
							<PencilLine
								size={60}
								strokeWidth={2}
								absoluteStrokeWidth={true}
							/>
							<p className="text-lg font-semibold">Start Writing</p>
						</div>
						<p className="text-lg">
							Begin journaling with our easy-to-use interface.
						</p>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="flex flex-row justify-start items-center gap-4 bg-white bg-opacity-60 p-4 rounded-lg w-5/6 
										md:w-2/3
										hover:bg-opacity-80 
										focus-visible:bg-opacity-80 
										transition-all"
					>
						<div className="flex flex-col justify-center items-center gap-2 p-2">
							<Lightbulb size={60} strokeWidth={2} absoluteStrokeWidth={true} />
							<p className="text-lg font-semibold">Reflect & Grow</p>
						</div>
						<p className="text-lg">
							Look back on your journey and see how you&apos;ve grown.
						</p>
					</MotionDiv>
				</div>

				{/* features section */}
				<div className="flex flex-col justify-center items-center p-4">
					<div
						className="flex flex-col justify-center items-center w-full p-2 gap-10 text-center
										md:flex-row md:justify-around"
					>
						<MotionDiv
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="flex flex-col justify-center items-center w-full md:w-1/4 bg-white py-6 rounded-lg bg-opacity-60"
						>
							<div className="self-center drop-shadow-md">
								<NotebookPen
									size={70}
									strokeWidth={2}
									color="black"
									absoluteStrokeWidth={true}
								/>
							</div>
							<h2 className="text-lg font-semibold">Write Anytime</h2>
							<p className="flex-start text-wrap w-[40%]">
								Capture your thoughts on the go.
							</p>
						</MotionDiv>

						<MotionDiv
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="flex flex-col justify-center items-center w-full md:w-1/4 bg-white py-6 rounded-lg bg-opacity-60"
						>
							<div className="self-center drop-shadow-md">
								<FolderCheck
									size={70}
									strokeWidth={2}
									color="black"
									absoluteStrokeWidth={true}
								/>
							</div>
							<h2 className="text-lg font-semibold">Stay Organized</h2>
							<p className="flex-start text-wrap w-[40%]">
								Easily organize your entries.
							</p>
						</MotionDiv>

						<MotionDiv
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="flex flex-col justify-center items-center w-full md:w-1/4 bg-white py-6 rounded-lg bg-opacity-60"
						>
							<div className="self-center drop-shadow-md">
								<KeyRound
									size={70}
									strokeWidth={2}
									color="black"
									absoluteStrokeWidth={true}
								/>
							</div>
							<h2 className="text-lg font-semibold">Privacy First</h2>
							<p className="flex-start text-wrap w-[40%]">
								Your journal entries only belong to you.
							</p>
						</MotionDiv>
					</div>
				</div>
			</main>
		</>
	);
}
