"use client";

import { createNewEntry } from "@/actions/entryActions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
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

	return (
		<>
			<form
				action={createNewEntry}
				className="flex flex-col gap-4 justify-center items-center w-full"
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
					<h1 className="text-2xl flex-1 text-center">
						Create New Journal Entry
					</h1>
				</div>

				{/* input field for title */}
				<div className="flex flex-col w-5/6 gap-2">
					<label htmlFor="" className="text-xl">
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
				</div>

				{/* radio button group */}
				<div className="flex flex-row gap-5 flex-wrap justify-center items-center w-5/6">
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
				</div>

				{/* Textarea for journal entry body */}
				<div className="w-5/6 flex flex-col text-xl gap-2">
					<label htmlFor="">Content</label>
					<textarea
						name="body"
						id="body"
						placeholder="Put down your thoughts here..."
						required
						// onInvalid={(e) =>
						// 	(e.target as HTMLTextAreaElement).setCustomValidity(
						// 		"Journal entry body cannot be empty."
						// 	)
						// }
						className={`p-3 text-lg rounded-md bg-white h-auto md:min-h-60 min-h-96 bg-opacity-60  outline-none 
					focus-visible:scale-[1.02] focus-visible:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-white
					transition-all`}
					></textarea>
				</div>

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

				<button
					type="submit"
					className="bg-emerald-500 p-2 rounded-lg text-white w-1/2 md:w-1/3 text-lg hover:bg-emerald-400 hover:shadow-md hover:scale-105 transition-all 
                        focus-visible:bg-emerald-400 focus-visible:scale-105 focus-visible:shadow-md active:scale-95"
				>
					Create Journal Entry
				</button>
			</form>
		</>
	);
}
