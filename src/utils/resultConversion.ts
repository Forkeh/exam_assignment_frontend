import { IResult } from "@/models/IResult";

function resultConversion(result: IResult) {
	switch (result.discipline.resultType) {
		case "TIME": {
			return convertTimeResult(result.result);
		}
		case "DISTANCE": {
			return convertDistanceResult(result.result);
		}
		case "POINTS": {
			return convertPointsResult(result.result);
		}
		default: {
			return result.result;
		}
	}

	function convertTimeResult(value: number) {
		// Convert milliseconds to seconds
		const seconds = value / 1000;

		// Format the seconds to two decimal places
		const formattedTime = seconds.toFixed(3).padEnd(3, "0") + "s";

		return formattedTime;
	}

	function convertDistanceResult(value: number) {
		//convert from cm into m and cm
		const distance = value;
		const meters = Math.floor(distance / 100);
		const centimeters = distance - meters * 100;
		return `${meters}m ${centimeters.toString().padStart(2, "0")}cm`;
	}

	function convertPointsResult(value: number) {
		return `${value} points`;
	}
}

export { resultConversion };
