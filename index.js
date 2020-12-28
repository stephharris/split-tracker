'use strict'

const isNumber = (value) => {
	return typeof value === "number"
}

const isInMMSSFormat = (value) => {
	const regex = /(\d?\d?):(\d?\d?)/
	const matches = value.match(regex)

	return Boolean(matches)
}

const convertMMSSToSeconds = (value) => {
	const regex = /(\d?\d?):(\d?\d?)/
	const matches = value.match(regex)

	if(matches) {
		const minutes = Math.round((Number(matches[1]) * 60) * 100) / 100
		const seconds = Math.round((Number(matches[2]) * 100) / 100)

		return minutes + seconds		
	}	
}

const convertMinutesToSeconds = (min) => {

	if(isNumber(min)) {
		return Math.round((min * 60) * 100) / 100;
	} 

	if(isInMMSSFormat(min)) {
		return convertMMSSToSeconds(min);
	}

	return null;
}

const convertSecondsToMinutes = (sec) => {
	// value will be as a decimal
	return sec / 60;
}

const convertMinutesInDecimalsToMMSS = (value) => {
	const regex = /(\d+)?(\.\d+)/
	const matches = (value.toString()).match(regex);

	if(matches) {
		let minutes = Number(matches[1]) || 0
		let seconds = Math.round((Number(matches[2]) * 60) * 100 / 100)

		if(minutes === 0) {
			minutes = ''
		}

		if(seconds.toString().length === 1) {
			seconds = `0${seconds}`
		}

		return `${minutes}:${seconds}`		
	}	
}

const convertSecondsToMMSS = (value) => {
	const numericalValue = Number(value);
	if(numericalValue >= 60) {
		const minutesInDecimals = numericalValue / 60;
		return convertMinutesInDecimalsToMMSS(minutesInDecimals)
	} else {
		const seconds = Math.round(numericalValue * 100 / 100)
		return `:${seconds}`
	}

}


const calculateSplitByMileTime = (milePace, splitDistance) => {
	const milePaceInSeconds = convertMinutesToSeconds(milePace);

	const split = (milePaceInSeconds * splitDistance) / 1600;

	return { 
		precise_split: split,
		formatted_split: convertSecondsToMMSS(split)
	};
}

const calculateSplitByKilometerTime = (kmPace, splitDistance) => {
	const kmPaceInSeconds = convertMinutesToSeconds(kmPace);

	const split = (kmPaceInSeconds * splitDistance) / 1000;

	return { 
		precise_split: split,
		formatted_split: convertSecondsToMMSS(split)
	};
}

// do a check for no negative #'s

module.exports = {
	convertMinutesToSeconds,
	convertSecondsToMinutes,
	convertMinutesInDecimalsToMMSS,
	calculateSplitByMileTime,
	calculateSplitByKilometerTime
}

