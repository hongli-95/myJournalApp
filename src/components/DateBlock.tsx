type DateBlockPropsType = {
	createdAt?: Date;
	updatedAt?: Date;
};

export default function DateBlock({
	createdAt,
	updatedAt,
}: DateBlockPropsType) {
	const weekDays: string[] = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	const numberFormatter = new Intl.NumberFormat("en-US", {
		minimumIntegerDigits: 2,
	});

	// convert time to 12hr format
	function twelveHourFormat(hours: number, minutes: number) {
		let time: string = "";
		if (hours < 12) {
			time = `${numberFormatter.format(hours)}:${numberFormatter.format(
				minutes
			)} am`;

			return time;
		}

		const twelveHour = hours - 12;
		time = `${numberFormatter.format(twelveHour)}:${numberFormatter.format(
			minutes
		)} pm`;

		return time;
	}

	return (
		<div className="flex justify-start">
			{createdAt ? (
				<p className="text-sm text-slate-500">{`${
					weekDays[(createdAt as Date).getDay()]
				} ${numberFormatter.format(
					(createdAt as Date).getMonth() + 1
				)}/${numberFormatter.format((createdAt as Date).getDate())}/${(
					createdAt as Date
				).getFullYear()} - ${twelveHourFormat(
					createdAt.getHours(),
					createdAt.getMinutes()
				)}`}</p>
			) : null}

			{updatedAt ? (
				<p className="text-sm text-slate-500">{`${
					weekDays[(updatedAt as Date).getDay()]
				} ${numberFormatter.format(
					(updatedAt as Date).getMonth() + 1
				)}/${numberFormatter.format((updatedAt as Date).getDate())}/${(
					updatedAt as Date
				).getFullYear()} - ${twelveHourFormat(
					updatedAt.getHours(),
					updatedAt.getMinutes()
				)}`}</p>
			) : null}
		</div>
	);
}
