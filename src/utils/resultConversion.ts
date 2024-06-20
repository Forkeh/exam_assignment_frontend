import { IResult } from "@/models/IResult";

function resultConversion(result: IResult) {
    const resultAsNumber = Number(result.result);

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
        const time = resultAsNumber;
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;

        return `${minutes}:${seconds}s`;
    }

    function convertDistanceResult() {
        //convert from cm into m and cm
        const distance = resultAsNumber;
        const meters = Math.floor(distance / 100);
        const centimeters = distance - meters * 100;
        return `${meters.toString().padStart(2, "0")}m ${centimeters.toString().padStart(2, "0")}cm`;
    }

    function convertPointsResult() {
        return `${resultAsNumber} points`;
    }
}

export { resultConversion };
