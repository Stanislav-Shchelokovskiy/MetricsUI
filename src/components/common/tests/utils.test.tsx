import { validateValues } from '../hooks/UseValidate'


describe('testing validateValues: first returning value should contain valid values, the second returning value indicate whether the values are valid', () => {
    test('case 0', () => {
        const [validValues, areValuesValid] = validateValues(['qwe', 'asd'], ['qwe'])
        expect(areValuesValid).toBeTruthy()
        expect(validValues).toEqual(['qwe'])
    });
    test('case 1', () => {
        const [validValues, areValuesValid] = validateValues([1, 2], [3])
        expect(areValuesValid).toBeFalsy()
        expect(validValues).toEqual([])
    });
    test('case 2', () => {
        const [validValues, areValuesValid] = validateValues([1, 2], [2, 3])
        expect(areValuesValid).toBeFalsy()
        expect(validValues).toEqual([2])
    });
    test('case 3', () => {
        const [validValues, areValuesValid] = validateValues([{ id: 1, value: 'qwe' }, { id: 2, value: 'asd' }], [2], 'id')
        expect(areValuesValid).toBeTruthy()
        expect(validValues).toEqual([2])
    });
    test('case 4', () => {
        const [validValues, areValuesValid] = validateValues([{ id: 1, value: 'qwe' }, { id: 2, value: 'asd' }], [3], 'id')
        expect(areValuesValid).toBeFalsy()
        expect(validValues).toEqual([])
    });
    test('case 5', () => {
        const [validValues, areValuesValid] = validateValues([{ id: 1, value: 'qwe' }, { id: 2, value: 'asd' }], [2, 3], 'id')
        expect(areValuesValid).toBeFalsy()
        expect(validValues).toEqual([2])
    });
});
