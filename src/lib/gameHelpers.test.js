import {calculateWinner} from './gameHelpers'

test('calculateWinner should return null when given an empty list of squares', () => {
    const result = calculateWinner([]);
    expect(result).toBeNull();
});

