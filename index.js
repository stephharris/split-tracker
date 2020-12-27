'use strict'

const convertMinToSeconds = (min) => {
	return min * 60;
}

const convertSecondsToMin = (sec) => {
	// value will be as a decimal
	return sec / 60;
}

// format time in minutes

// format mile time

const calculateSplitByMileTime = (milePace, splitDistanceInMeters) => {
	const milePaceInSeconds = convertMinToSeconds(milePace);

	const split = (milePaceInSeconds * splitDistanceInMeters) / 1600;

	return split;
}

module.exports = {
	convertMinToSeconds,
	convertSecondsToMin,
	calculateSplitByMileTime
}

