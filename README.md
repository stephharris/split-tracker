# Split-Tracker
A simple JS library for calculating running track split times.

## Installing:

Install with npm:

```
$ npm install split-tracker --save
```

with yarn:
```
$ yarn add split-tracker
```

or add it directly to your webpage using a CDN:
```html
	<head>
		<script src="https://cdn.jsdelivr.net/npm/split-tracker@1.0.5/dist/index.min.js"></script>
	</head>
```

if you are working off an older version of the CDN, simply replace split-tracker@X.X.X with a more precise version #

## Implementing:

```javascript

	const splitTracker = require('split-tracker');

	splitTracker.calculateSplitByMileTime(6, 200);

```

```javascript

	import { calculateSplitByMileTime, calculateSplitByKilometerTime } from 'split-tracker';

	splitTracker.calculateSplitByMileTime(6, 200);

	splitTracker.calculateSplitByKilometerTime('3:30', 400)

```

```html
	
	<html> 
		<head>
			<script src="https://cdn.jsdelivr.net/npm/split-tracker@1.0.4/dist/index.min.js"></script>
		</head>


	// inside of js file (or script tag)
	document.querySelector("body").onload = function() {
		var split = splitTracker.calculateSplitByMileTime(6, 200);

		console.log('split: ', split);
	}

```

## API:

### convertSecondsToMMSS
```javascript
		
	const seconds = 6.5; 

	convertSecondsToMMSS(seconds) // => '6:30'

```

### convertMMSSToSeconds
```javascript
		
	const time = '15:30';

	convertMMSSToSeconds(time); // => 930 (seconds)

```

### convertMinutesInDecimalsToMMSS
```javascript
		
	const minutes = 1.512;

	convertMinutesInDecimalsToMMSS(minutes); // => 1:31

```

### calculateSplitByMileTime
```javascript
		
	const mileTime = '6:00'; 
	// may be a formatted string (mm:ss) or a valid number (e.g. 6 or 6.0)

	const splitDistance = 200; 
	// must be a valid number in meters

	calculateSplitByMileTime(mileTime, splitDistance); 
	// => { precise_split: 44.74, formatted_split: ':45' }

```

### calculateSplitByKilometerTime
```javascript
		
	const kilometerTime = '3:30'; 
	// may be a formatted string (mm:ss) or a valid number (e.g. 3.5)

	const splitDistance = 5000; 
	// must be a valid number in meters

	calculateSplitByKilometerTime(kilometerTime, splitDistance); 
	// => { precise_split: 1050, formatted_split: '17:30' }

```
