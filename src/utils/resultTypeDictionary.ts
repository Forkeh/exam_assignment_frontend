function resultTypeDictionary(resultType: string | undefined): string {
    switch (resultType) {
        case "TIME":
            return "in seconds";
        case "DISTANCE":
            return "in centimeters";
        case "POINTS":
            return "in points";
        default:
            return "unknown";
    }
}

export default resultTypeDictionary;