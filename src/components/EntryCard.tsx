import DateBlock from "./DateBlock";
import DateStripe from "./DateStripe";

type EntryCardPropsType = {
	title: string;
	mood: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	// imagePath: string | null;
};

export default function EntryCard({
	title,
	mood,
	body,
	createdAt,
	updatedAt,
}: // imagePath,
EntryCardPropsType) {
	return (
		<div
			className="flex flex-col gap-2 border-2 border-white p-2 m-4 rounded-md min-h-full bg-white bg-opacity-30
						group-hover:shadow-md group-hover:bg-opacity-70 group-hover:scale-105 group
						group-focus-visible:shadow-md group-focus-visible:bg-opacity-70 group-focus-visible:scale-105 
						transition-all"
		>
			<div className="flex flex-row w-full justify-center items-center">
				<h2 className="text-lg flex-1 text-center line-clamp-1 p-1">{title}</h2>
				{/* {imagePath && <IconImage className="w-8 h-8" />} */}
			</div>

			{/* mood emoji */}
			<div
				className="flex flex-row items-center gap-2 bg-white bg-opacity-80 rounded-md w-fit p-2 
							group-hover:bg-slate-200 
								group-focus-visible:bg-slate-200 
								transition-all"
			>
				<DateBlock createdAt={createdAt} />

				<div className="text-2xl">
					{mood === "fantastic" ? (
						<span> &#128513;</span>
					) : mood === "good" ? (
						<span> &#128522;</span>
					) : mood === "alright" ? (
						<span> &#128529;</span>
					) : mood === "awful" ? (
						<span> &#128555;</span>
					) : (
						""
					)}
				</div>
			</div>

			<p className="line-clamp-5 [overflow-wrap:anywhere] text-slate-600 p-1">{`${body}`}</p>

			<div className="mt-auto">
				<div
					className={` ${
						updatedAt.getTime() !== createdAt.getTime()
							? "border-t-[1px] border-black"
							: ""
					}`}
				>
					{updatedAt.getTime() === createdAt.getTime() ? null : (
						<div className="flex flex-row gap-2 md:flex-col md:gap-0 ">
							<div className="text-sm text-slate-500">Last Updated: </div>
							<DateStripe updatedAt={updatedAt} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
