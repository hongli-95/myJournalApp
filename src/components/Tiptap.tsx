"use client";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";
import StarterKit from "@tiptap/starter-kit";
import {
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	HighlighterIcon,
	QuoteIcon,
} from "lucide-react";

type TipTapPropsType = {
	content: string;
	onChange: (content: string) => void;
};

// menu bar for text formatting
// above the rich text editor
function MenuBar() {
	const { editor } = useCurrentEditor();

	if (!editor) {
		return null;
	}

	return (
		<div className="flex gap-4 bg-white bg-opacity-70 rounded-tl-md rounded-tr-md p-1">
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={`flex justify-center items-center p-2 rounded-md transition-all ${
					editor.isActive("bold") ? "bg-black bg-opacity-50 text-white" : ""
				}`}
			>
				<BoldIcon className="w-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={`flex justify-center items-center p-2 rounded-md transition-all ${
					editor.isActive("italic") ? "bg-black bg-opacity-50 text-white" : ""
				}`}
			>
				<ItalicIcon className="w-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				className={`flex justify-center items-center p-2 rounded-md transition-all ${
					editor.isActive("underline")
						? "bg-black bg-opacity-50 text-white"
						: ""
				}`}
			>
				<UnderlineIcon className="w-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().toggleHighlight().run()}
				className={`flex justify-center items-center p-2 rounded-md transition-all ${
					editor.isActive("highlight")
						? "bg-black bg-opacity-50 text-white"
						: ""
				}`}
			>
				<HighlighterIcon className="w-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={`flex justify-center items-center p-2 rounded-md transition-all ${
					editor.isActive("blockquote")
						? "bg-black bg-opacity-50 text-white"
						: ""
				}`}
			>
				<QuoteIcon className="w-4" />
			</button>
		</div>
	);
}

// tiptap editor
export default function Tiptap({ content, onChange }: TipTapPropsType) {
	const extensions = [
		StarterKit,
		Underline,
		Highlight,
		Blockquote,
		Placeholder.configure({
			emptyEditorClass:
				"before:content-[attr(data-placeholder)] before:float-left before:text-[#adb5bd] before:h-0 before:pointer-events-none",
			placeholder: "What is on your mind?",
		}),
	];
	const editorProps = {
		attributes: {
			class:
				"p-3 text-lg rounded-bl-md rounded-br-md bg-white h-auto md:min-h-60 min-h-60 bg-opacity-60 outline-none focus-visible:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-white transition-all",
		},
	};

	return (
		<div className="w-full">
			<EditorProvider
				immediatelyRender={false}
				slotBefore={<MenuBar />}
				extensions={extensions}
				content={content}
				editorProps={editorProps}
				onUpdate={({ editor }) => {
					const html = editor.getHTML();
					onChange(html);
				}}
			>
				<></>
			</EditorProvider>
		</div>
	);
}
