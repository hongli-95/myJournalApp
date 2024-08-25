"use client";

import {
	deleteEntry,
	fetchEditEntry,
	updateEntry,
} from "@/actions/entryActions";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Entry } from "@prisma/client";
import { MotionDiv } from "@/components/MotionDiv";
import Tiptap from "@/components/Tiptap";
import { Loader2 } from "lucide-react";

export default function EditEntryForm({
	params: { id },
}: {
	params: { id: string };
}) {
	const [editorContent, setEditorContent] = useState<string>("");

	useEffect(() => {
		setIsLoading(true);
		// returns a promise, hence .then
		fetchEditEntry(id).then((data) => {
			setEntry(data as Entry);
			// ! is non-null assertion operator
			setMood(data!.mood);
			setEditorContent(data?.body as string);
			setIsLoading(false);
		});
	}, [id]);

	// import the type Entry from prisma, and use it for typing state
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [entry, setEntry] = useState<Entry>();
	const [mood, setMood] = useState<string>("");

	// in this case, e(vent) is a React.ChangeEvent
	const changeMood = (e: React.ChangeEvent) => {
		setMood((e.target as HTMLInputElement).value);
	};

	// use null as default value for ref
	const modalRef = useRef<HTMLDialogElement>(null);

	return (
		<div>
			{/* delete confirmation dialog modal */}
			<dialog
				ref={modalRef}
				className="flex-col gap-5 p-6 rounded-md border-4 border-slate-700 -translate-y-5 backdrop:bg-slate-600 backdrop:opacity-50 transition-all 
							open:flex open:opacity-100
							opacity-0"
			>
				<p className="text-lg">
					Are you sure you want to delete this journal entry?
				</p>
				<div className="flex flex-row justify-center gap-10">
					<button
						onClick={() => modalRef.current?.close()}
						className="bg-blue-500 rounded-md p-2 text-white text-lg 
					hover:bg-blue-400 hover:scale-105 
					focus-visible:bg-blue-400 focus-visible:scale-105 
					transition-all shadow-md"
					>
						Cancel
					</button>
					<button
						onClick={() => deleteEntry(id)}
						className="bg-red-500 rounded-md p-2 text-white text-lg 
					hover:bg-red-400 hover:scale-105 
					focus-visible:bg-red-400 focus-visible:scale-105 
					transition-all shadow-md"
					>
						Delete
					</button>
				</div>
			</dialog>

			{isLoading ? (
				<div className="flex flex-col justify-center items-center translate-y-10">
					<Loader2 size={100} color="white" className="animate-spin" />
					<p className="text-2xl text-white">Loading...</p>
				</div>
			) : (
				<form
					action={updateEntry}
					className="flex flex-col gap-4 justify-center items-center "
				>
					<div className="flex flex-row justify-center items-center w-full">
						<Link
							href={`/entries/${id}`}
							className="mr-auto bg-slate-600 text-white p-2 rounded-md hover:bg-slate-400 hover:scale-105 
                    focus-visible:bg-slate-400 focus-visible:scale-105 active:scale-95 transition-all self-start"
						>
							Back
						</Link>
						<h1 className="text-2xl flex-1 text-center text-white">
							Edit Journal Entry
						</h1>
					</div>

					{/* hidden input field for id*/}
					<input name="id" id="id" value={id} className="hidden" readOnly />

					{/* input field for entry title */}
					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="flex flex-col w-5/6 gap-2"
					>
						<label htmlFor="" className="text-xl text-white">
							Title
						</label>
						<input
							type="text"
							name="title"
							id="title"
							defaultValue={entry?.title}
							required
							disabled={isLoading ? true : false}
							autoFocus
							autoComplete="off"
							onInvalid={(e) =>
								(e.target as HTMLInputElement).setCustomValidity(
									"Give it a title?"
								)
							}
							className={`p-3 text-lg rounded-md bg-white bg-opacity-60  ${
								isLoading ? "bg-slate-400 bg-opacity-40" : ""
							}
						transition-all`}
						/>
					</MotionDiv>

					{/* radio button group */}
					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="flex flex-row gap-3 flex-wrap justify-center items-center"
					>
						<div>
							<label
								htmlFor="fantastic"
								className={`bg-white p-2 cursor-pointer rounded-md ${
									mood === "fantastic" ? "bg-opacity-90" : "bg-opacity-60"
								}`}
							>
								<input
									onChange={(e) => changeMood(e)}
									type="radio"
									name="mood"
									id="fantastic"
									value="fantastic"
									checked={mood === "fantastic"}
									disabled={isLoading ? true : false}
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
									onChange={(e) => changeMood(e)}
									type="radio"
									name="mood"
									id="good"
									value="good"
									disabled={isLoading ? true : false}
									checked={mood === "good"}
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
									onChange={(e) => changeMood(e)}
									type="radio"
									name="mood"
									id="alright"
									value="alright"
									disabled={isLoading ? true : false}
									checked={mood === "alright"}
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
									onChange={(e) => changeMood(e)}
									type="radio"
									name="mood"
									id="awful"
									value="awful"
									disabled={isLoading ? true : false}
									checked={mood === "awful"}
									className="rounded-md cursor-pointer"
								/>
								<span className="p-2">Awful &#128555;</span>
							</label>
						</div>
					</MotionDiv>

					{/* Textarea for journal entry body to store text value*/}
					<div>
						<textarea
							name="body"
							id="body"
							value={editorContent}
							readOnly
							className="hidden"
						></textarea>
					</div>

					{/* tiptap editor */}
					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className={`w-5/6 flex flex-col text-xl gap-2 transition-all`}
					>
						<label htmlFor="" className="text-white">
							Content
						</label>
						<Tiptap content={editorContent} onChange={setEditorContent} />
					</MotionDiv>

					<MotionDiv
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="flex w-full justify-center items-center gap-5 flex-col md:flex-row"
					>
						<button
							type="submit"
							disabled={isLoading ? true : false}
							className="bg-transparent p-2 rounded-lg text-white w-5/6 bg-white bg-opacity-50 border-white border-2 md:w-1/3 text-lg 
						hover:bg-blue-400 hover:shadow-md hover:scale-105 
		        	focus-visible:bg-blue-400 focus-visible:scale-105 focus-visible:shadow-md 
					active:scale-95 transition-all"
						>
							Save Edit
						</button>
						<button
							onClick={() => modalRef.current?.showModal()}
							type="button"
							disabled={isLoading ? true : false}
							className="bg-transparent p-2 rounded-lg text-white w-5/6 bg-white bg-opacity-50 border-white border-2 md:w-1/3 text-lg 
						hover:bg-red-400 hover:shadow-md hover:scale-105 
		        	focus-visible:bg-red-400 focus-visible:scale-105 focus-visible:shadow-md 
					active:scale-95 transition-all"
						>
							Delete Entry
						</button>
					</MotionDiv>
				</form>
			)}
		</div>
	);
}
