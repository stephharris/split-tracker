'use strict'

/// HELPER FUNCTIONS ///

const isValidNumber = (value: any): boolean  => {
	return Boolean(typeof value === 'number' && value >= 0)
}

const isInMMSSFormat = (value: any): boolean => {
	const regex = /(\d?\d?):(\d?\d?)/
	const matches = value.match(regex)

	return Boolean(matches)
}

const convertMinutesToSeconds = (min: any): any => {
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

const convertSecondsToMinutes = (sec: any): any => {
	// will return a decimal
	if(!isValidNumber(sec)) return null

	return sec / 60;
}


/// EXPORTED FUNCTIONS ///

interface Split {
	precise_split: number,
	formatted_split: string
}

const convertMMSSToSeconds = (value: any): number => {
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

const convertMinutesInDecimalsToMMSS = (value: any): any => {
	if(!value || !isValidNumber(value)) {
		throw new Error('Value invalid.')
	} 

	const regex = /(\d+)?(\.\d+)?/
	const matches = (value.toString()).match(regex);

	if(matches) {
		let minutes: string | number = Number(matches[1]) || ''
		let seconds: string | number = Math.round((Number(matches[2]) * 60) * 100 / 100) || 0

		if(seconds >= 0 && seconds < 10) {
			seconds = `0${seconds}`
		}

		return `${minutes}:${seconds}`		
	}	else {
			throw new Error('Value invalid.');	
	}
}

const convertSecondsToMMSS = (value: any): any => {
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


const calculateSplitByMileTime = (milePace: any, splitDistance: number): Split => {
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

const calculateSplitByKilometerTime = (kmPace: any, splitDistance: number): Split => {
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