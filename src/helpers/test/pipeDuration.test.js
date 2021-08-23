import { timeConverter } from '../../utils/functions';

test('convert time to HH:MM format', () => {
	expect(timeConverter(540)).toBe('09:00');
	expect(timeConverter(755)).toBe('12:35');
	expect(timeConverter(5)).toBe('00:05');
});
