import { 
  calculateSplitByMileTime,
  calculateSplitByKilometerTime,
  convertSecondsToMMSS,
  convertMMSSToSeconds,
  convertMinutesInDecimalsToMMSS 
} from './index';

jest.disableAutomock();

test('calculateSplitByMileTime', () => {
  expect(calculateSplitByMileTime(6.5, 400)).toStrictEqual({ precise_split: 96.93, formatted_split: '1:37' });
  expect(calculateSplitByMileTime('6', 200)).toStrictEqual({ precise_split: 44.74, formatted_split: ':45' });
  expect(calculateSplitByMileTime('08:00', 800)).toStrictEqual({ precise_split: 238.61, formatted_split: '3:59' });
  expect(calculateSplitByMileTime('8.02', 1600)).toStrictEqual({ precise_split: 478.41, formatted_split: '7:58' });
  expect(calculateSplitByMileTime('4:50', 5000)).toStrictEqual({ precise_split: 900.99, formatted_split: '15:01' });
})

test('calculateSplitByKilometerTime', () => {
	expect(calculateSplitByKilometerTime('3:45', 1609.34)).toStrictEqual({ precise_split: 362.1, formatted_split: '6:02' });
	expect(calculateSplitByKilometerTime(3.5, 5000)).toStrictEqual({ precise_split: 1050, formatted_split: '17:30' });
	expect(calculateSplitByKilometerTime('03.50', 5000)).toStrictEqual({ precise_split: 1050, formatted_split: '17:30' });
	expect(calculateSplitByKilometerTime('3', 200)).toStrictEqual({ precise_split: 36, formatted_split: ':36' });
	expect(calculateSplitByKilometerTime('04:00', 800)).toStrictEqual({ precise_split: 192, formatted_split: '3:12' });
})

test('convertSecondsToMMSS', () => {
	expect(convertSecondsToMMSS(45)).toBe(':45');
	expect(convertSecondsToMMSS(93)).toBe('1:33');
	expect(convertSecondsToMMSS(100.5)).toBe('1:41');
})

test('convertMMSSToSeconds', () => {
	expect(convertMMSSToSeconds(':45')).toBe(45);
	expect(convertMMSSToSeconds('15:30')).toBe(930);
	expect(() => convertMMSSToSeconds('0')).toThrow('Value not in MM:SS format.');
	expect(() => convertMMSSToSeconds('2')).toThrow('Value not in MM:SS format.');
	expect(() => convertMMSSToSeconds(2)).toThrow('Value not in MM:SS format.');
	expect(() => convertMMSSToSeconds(0)).toThrow('Value not in MM:SS format.');
})

test('convertMinutesInDecimalsToMMSS', () => {
	expect(convertMinutesInDecimalsToMMSS(1)).toBe('1:00');
	expect(convertMinutesInDecimalsToMMSS(1.512)).toBe('1:31');
	expect(() => convertMinutesInDecimalsToMMSS('2')).toThrow('Value invalid.');
	expect(() => convertMinutesInDecimalsToMMSS('0')).toThrow('Value invalid.');
	expect(() => convertMinutesInDecimalsToMMSS(0)).toThrow('Value invalid.');
})