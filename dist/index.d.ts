interface Split {
    precise_split: number;
    formatted_split: string;
}
declare const convertMMSSToSeconds: (value: any) => number;
declare const convertMinutesInDecimalsToMMSS: (value: any) => any;
declare const convertSecondsToMMSS: (value: any) => any;
declare const calculateSplitByMileTime: (milePace: any, splitDistance: number) => Split;
declare const calculateSplitByKilometerTime: (kmPace: any, splitDistance: number) => Split;
export { convertSecondsToMMSS, convertMMSSToSeconds, convertMinutesInDecimalsToMMSS, calculateSplitByMileTime, calculateSplitByKilometerTime };
