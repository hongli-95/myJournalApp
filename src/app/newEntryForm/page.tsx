"use client";

import { createNewEntry } from "@/actions/entryActions";
import { MotionDiv } from "@/components/MotionDiv";
import Tiptap from "@/components/Tiptap";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateNewEntry() {
	// check if the user is logged in
	const { isAuthenticated, isLoading } = useKindeBrowserClient();
	if (!isLoading) {
		if (!isAuthenticated) {
			redirect("/api/auth/login");
		}
	}

	const [mood, setMood] = useState<string>("happy");
	const [editorContent, setEditorContent] = useState<string>("");

	return (
		<>
			{isLoading ? (
				<div className="flex flex-col justify-center items-center translate-y-10">
					<Loader2 size={100} color="white" className="animate-spin" />
					<p className="text-2xl text-white">Loading...</p>
				</div>
			) : (
				<form
					action={createNewEntry}
					className="flex flex-col gap-4 justify-center items-center w-full "
				>
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
					</div>

					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<h1 className="text-2xl flex-1 text-center text-white">
							Create New Journal Entry
						</h1>
					</MotionDiv>

					{/* input field for title */}
					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="flex flex-col w-5/6 gap-2"
					>
						<label htmlFor="" className="text-xl text-white">
							Title
						</label>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Title here..."
							required
							autoComplete="off"
							autoFocus
							// onInvalid={(e) =>
							// 	(e.target as HTMLInputElement).setCustomValidity("Give it a title?")
							// }
							className="p-3 text-lg rounded-md bg-white bg-opacity-60 outline-none
					focus-visible:scale-[1.02] focus-visible:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-white
					transition-all"
						/>
					</MotionDiv>

					{/* radio button group */}
					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="flex flex-row gap-5 flex-wrap justify-center items-center w-5/6 my-4"
					>
						<div>
							<label
								htmlFor="fantastic"
								className={`bg-white p-2 cursor-pointer rounded-md ${
									mood === "fantastic" ? "bg-opacity-90" : "bg-opacity-60"
								}`}
							>
								<input
									onClick={(e) => setMood((e.target as HTMLInputElement).value)}
									type="radio"
									name="mood"
									id="fantastic"
									value="fantastic"
									defaultChecked
									className="rounded-md cursor-pointer"
								/>
								<span className="p-2 text-lg">Fantastic &#128513;</span>
							</label>
						</div>
						<div>
							<label
								htmlFor="good"
								className={`bg-white p-2 cursor-pointer rounded-md ${
									mood === "good" ? "bg-opacity-90" : "bg-opacity-60"
								}`}
							>
								<input
									onClick={(e) => setMood((e.target as HTMLInputElement).value)}
									type="radio"
									name="mood"
									id="good"
									value="good"
									className="rounded-md cursor-pointer"
								/>
								<span className="p-2 text-lg">Good &#128522;</span>
							</label>
						</div>
						<div>
							<label
								htmlFor="alright"
								className={`bg-white p-2 cursor-pointer rounded-md ${
									mood === "alright" ? "bg-opacity-90" : "bg-opacity-60"
								}`}
							>
								<input
									onClick={(e) => setMood((e.target as HTMLInputElement).value)}
									type="radio"
									name="mood"
									id="alright"
									value="alright"
									className="rounded-md cursor-pointer"
								/>
								<span className="p-2 text-lg">Alright &#128529;</span>
							</label>
						</div>
						<div>
							<label
								htmlFor="awful"
								className={`bg-white p-2 cursor-pointer rounded-md ${
									mood === "awful" ? "bg-opacity-90" : "bg-opacity-60"
								}`}
							>
								<input
									onClick={(e) => setMood((e.target as HTMLInputElement).value)}
									type="radio"
									name="mood"
									id="awful"
									value="awful"
									className="rounded-md cursor-pointer"
								/>
								<span className="p-2">Awful &#128555;</span>
							</label>
						</div>
					</MotionDiv>

					{/* Textarea for journal entry body */}
					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="w-5/6 flex flex-col text-xl gap-2"
					>
						<textarea
							name="body"
							id="body"
							required
							value={editorContent}
							readOnly
							// onInvalid={(e) =>
							// 	(e.target as HTMLTextAreaElement).setCustomValidity(
							// 		"Journal entry body cannot be empty."
							// 	)
							// }
							className="hidden"
						></textarea>
					</MotionDiv>

					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="w-5/6 flex flex-col text-xl gap-2"
					>
						<label htmlFor="" className="text-white">
							Content
						</label>
						<Tiptap content={editorContent} onChange={setEditorContent} />
					</MotionDiv>

					{/* input field for iamge
				<div className="flex flex-col w-full justify-center items-center gap-2">
					<label htmlFor="image" className="w-5/6 text-lg">
						Upload a picture? (Optional. Only 1 picture):
					</label>
					<input
						type="file"
						name="image"
						multiple
						className="p-3 text-lg rounded-md bg-white w-5/6 bg-opacity-60 focus-visible:scale-[1.02] focus-visible:bg-opacity-90 transition-all active:scale-[1.02]"
					/>
				</div> */}

					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="flex justify-center items-center w-full"
					>
						<button
							type="submit"
							className="bg-white bg-opacity-40 border-2 p-2 rounded-lg text-white w-1/2 md:w-1/3 text-lg hover:bg-emerald-400 hover:shadow-md hover:scale-105 transition-all 
                        focus-visible:bg-emerald-400 focus-visible:scale-105 focus-visible:shadow-md active:scale-95"
						>
							Create Journal Entry
						</button>
					</MotionDiv>
				</form>
			)}
		</>
	);
}
