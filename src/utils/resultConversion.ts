import { IResult } from "@/models/IResult";

function resultConversion(result: IResult) {
	switch (result.discipline.resultType) {
		case "TIME": {
			return convertTimeResult();
		}
		case "DISTANCE": {
			return convertDistanceResult();
		}
		case "POINTS": {
			return convertPointsResult();
		}
		default: {
			return result.result;
		}
	}

	function convertTimeResult() {
		// const time = result.result;
		// const minutes = Math.floor(time / 60);
		// const fullSeconds = Math.floor(time % 60);
		// const milliseconds = Math.floor((time % 1) * 100);

		// return `${minutes}:${fullSeconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}s`;

		// Convert milliseconds to seconds
		const seconds = result.result / 1000;

		// Format the seconds to two decimal places
		const formattedTime = seconds.toFixed(2) + "s";

		return formattedTime;
	}

	function convertDistanceResult() {
		//convert from cm into m and cm
		const distance = result.result;
		const meters = Math.floor(distance / 100);
		const centimeters = distance - meters * 100;
		return `${meters}m ${centimeters.toString().padStart(2, "0")}cm`;
	}

	function convertPointsResult() {
		return `${result.result} points`;
	}
}

export { resultConversion };
