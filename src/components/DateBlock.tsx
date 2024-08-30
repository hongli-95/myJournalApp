type DateBlockPropsType = {
	createdAt: Date;
};

export default function DateBlock({ createdAt }: DateBlockPropsType) {
	const weekDays: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const numberFormatter = new Intl.NumberFormat("en-US", {
		minimumIntegerDigits: 2,
	});

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="font-sans font-semibold antialiased">
				{weekDays[createdAt.getDay()]}
			</div>
			<div>
				{numberFormatter.format(createdAt.getMonth() + 1)} /{" "}
				{numberFormatter.format(createdAt.getDate())}
			</div>
			<div>{createdAt.getFullYear()}</div>
		</div>
	);
}
