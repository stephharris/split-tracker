const { convertMinutesToSeconds,
	convertSecondsToMinutes,
	calculateSplitByMileTime,
	calculateSplitByKilometerTime,
	convertMinutesInDecimalsToMMSS } = require('split-tracker');

console.log(calculateSplitByMileTime('08:15', 200))