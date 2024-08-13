import DateBlock from "./DateBlock";
import IconImage from "./IconImage";

type EntryCardPropsType = {
	title: string;
	mood: string;
	body: string;
	imagePath: string | null;
	createdAt: Date;
};

export default function EntryCard({
	title,
	mood,
	body,
	imagePath,
	createdAt,
}: EntryCardPropsType) {
	return (
		<div
			className="flex flex-col gap-2 border-2 border-slate-700 p-2 m-4 rounded-md min-h-full
		group-hover:border-white group-hover:shadow-md group-hover:scale-105
		group-focus-visible:border-white group-focus-visible:shadow-md group-focus-visible:scale-105 
		transition-all"
		>
			<div className="flex flex-row w-full justify-center items-center">
				<h2 className="text-lg flex-1 text-center line-clamp-1 p-1">{title}</h2>
				{imagePath && <IconImage className="w-8 h-8" />}
			</div>

			{/* mood emoji */}
			<div>
				<div className="text-2xl">
					{mood === "happy" ? (
						<span> &#128513;</span>
					) : mood === "fine" ? (
						<span> &#128522;</span>
					) : mood === "meh" ? (
						<span> &#128529;</span>
					) : mood === "tolerable" ? (
						<span> &#128533;</span>
					) : mood === "awful" ? (
						<span> &#128555;</span>
					) : (
						""
					)}
				</div>
			</div>

			<p className="line-clamp-5 [overflow-wrap:anywhere] text-slate-600">{`${body}`}</p>

			<div className="mt-auto border-t-[1px] border-black">
				<DateBlock createdAt={createdAt} />
			</div>
		</div>
	);
}
