declare const isValidNumber: (value: any) => boolean;
declare const isInMMSSFormat: (value: any) => boolean;
declare const convertMinutesToSeconds: (min: any) => any;
declare const convertSecondsToMinutes: (sec: any) => any;
interface Split {
    precise_split: number;
    formatted_split: string;
}
declare const convertMMSSToSeconds: (value: any) => number;
declare const convertMinutesInDecimalsToMMSS: (value: any) => any;
declare const convertSecondsToMMSS: (value: any) => any;
declare const calculateSplitByMileTime: (milePace: any, splitDistance: number) => Split;
declare const calculateSplitByKilometerTime: (kmPace: any, splitDistance: number) => Split;
