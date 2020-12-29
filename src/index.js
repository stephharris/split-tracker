'use strict'

/// HELPER FUNCTIONS ///

const isValidNumber = (value) => {
	return Boolean(typeof value === 'number' && value >= 0)
}

const isInMMSSFormat = (value) => {
	const regex = /(\d?\d?):(\d?\d?)/
	const matches = value.match(regex)

	return Boolean(matches)
}

const convertMinutesToSeconds = (min) => {
	// accepts as '6.5', 6.512, '6:30'

	if(isValidNumber(min)) {
		return Math.round((min * 60) * 100) / 100;
	} 

	if(isInMMSSFormat(min)) {
		return convertMMSSToSeconds(min);
	}

	if(typeof min === 'string' && Number(min)) {
		const num = Number(min);
		return Math.round((num * 60) * 100) / 100;
	}

	return null;
}

const convertSecondsToMinutes = (sec) => {
	// will return a decimal
	if(!isValidNumber(sec)) return null

	return sec / 60;
}


/// EXPORTED FUNCTIONS ///

const convertMMSSToSeconds = (value) => {
	if(!value || isValidNumber(value)) {
		throw new Error('Value not in MM:SS format.')
	} 

	const regex = /(\d?\d?):(\d?\d?)/
	const matches = value.match(regex)

	if(matches) {
		const minutesInSeconds = Number(matches[1]) * 60
		const seconds = Number(matches[2])

		return minutesInSeconds + seconds
	} else {
		throw new Error('Value not in MM:SS format.');
	}
}

const convertMinutesInDecimalsToMMSS = (value) => {
	if(!value || !isValidNumber(value)) {
		throw new Error('Value invalid.')
	} 

	const regex = /(\d+)?(\.\d+)?/
	const matches = (value.toString()).match(regex);

	if(matches) {
		let minutes = Number(matches[1]) || 0
		let seconds = Math.round((Number(matches[2]) * 60) * 100 / 100) || 0

		if(minutes === 0) {
			minutes = ''
		}

		if(seconds.toString().length === 1) {
			seconds = `0${seconds}`
		}

		return `${minutes}:${seconds}`		
	}	else {
			throw new Error('Value invalid.');	
	}
}

const convertSecondsToMMSS = (value) => {
	const numericalValue = Number(value);

	if(!isValidNumber(numericalValue)) return null

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

	if(!isValidNumber(milePaceInSeconds) || !isValidNumber(splitDistance)) {
		throw 'Parameter is not a valid number.'
	}

	const split = (milePaceInSeconds * splitDistance) / 1609.34;

	return { 
		precise_split: Math.round(100 * split) / 100, // rounding precise split to nearest hundredth
		formatted_split: convertSecondsToMMSS(split)
	};
}

const calculateSplitByKilometerTime = (kmPace, splitDistance) => {
	const kmPaceInSeconds = convertMinutesToSeconds(kmPace);

	if(!isValidNumber(kmPaceInSeconds) || !isValidNumber(splitDistance)) {
		throw 'Parameter is not a valid number.'
	}

	const split = (kmPaceInSeconds * splitDistance) / 1000;

	return { 
		precise_split: Math.round(100 * split) / 100, // rounding precise split to nearest hundredth
		formatted_split: convertSecondsToMMSS(split)
	};
}

module.exports = {
	convertSecondsToMMSS,
	convertMMSSToSeconds,
	convertMinutesInDecimalsToMMSS,
	calculateSplitByMileTime,
	calculateSplitByKilometerTime
}