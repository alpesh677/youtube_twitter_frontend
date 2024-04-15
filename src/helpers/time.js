export function timeDuration(seconds) {
	const minutes = Math.floor(seconds / 60);
	const second = Math.floor(seconds % 60);

	return minutes + ":" + (second < 10 ? "0" : "") + second;
}

export function timeCreated(createdAt) {
	const now = new Date();
	const difference = Math.abs(now - new Date(createdAt));

	const seconds = difference / 1000;
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = hours / 24;
	const weeks = days / 7;
	const months = days / 30; // Approximation for simplicity
	const years = months / 12;

	// Utility function to format the time string
	const formatTime = (value, unit) => {
		return `${Math.round(value)} ${unit}${
			Math.round(value) !== 1 ? "s" : ""
		} ago`;
	};

	if (seconds < 60) return formatTime(seconds, "second");
	else if (minutes < 60) return formatTime(minutes, "minute");
	else if (hours < 24) return formatTime(hours, "hour");
	else if (days < 7) return formatTime(days, "day");
	else if (weeks < 4)
		return formatTime(
			weeks,
			"week",
		); // Assuming 4 weeks in a month for simplicity
	else if (months < 12) return formatTime(months, "month");
	else return formatTime(years, "year");
}
