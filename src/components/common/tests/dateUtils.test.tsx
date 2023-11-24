import { toDate, dateToISOstr, validatePeriod } from '../DateUtils'

describe('testing toDate: iso date should be converted to Date without time if value is not empty.', () => {
    test('case 0', () => {
        const res = toDate('2020-02-01')
        expect(res).toEqual(new Date(2020, 1, 1, 0, 0, 0, 0))
    });
    test('case 1', () => {
        const res = toDate('')
        expect(res).toEqual(undefined)
    });
    test('case 2', () => {
        const res = toDate(undefined)
        expect(res).toEqual(undefined)
    });
});

describe('testing dateToISOstr: Date should be converted to ISO 8601 UTC date without time.', () => {
    test('case 0', () => {
        const res = dateToISOstr(new Date(2020, 0, 1, 2, 3, 4, 5))
        expect(res).toEqual('2020-01-01')
    });
});

describe('testing validatePeriod: a new period should be inside valid period.', () => {
    test('case 0', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-03-03', '2021-02-02']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(validPeriod)
        expect(isValid).toBeTruthy()
    });
    test('case 0', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-03-04', '2021-02-01']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(['2020-03-04', '2021-02-01'])
        expect(isValid).toBeTruthy()
    });
    test('case 1', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-02-01', '2021-02-02']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(validPeriod)
        expect(isValid).toBeFalsy()
    });
    test('case 2', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-03-03', '2021-02-03']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(validPeriod)
        expect(isValid).toBeFalsy()
    });
    test('case 3', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-03-02', '2021-02-03']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(validPeriod)
        expect(isValid).toBeFalsy()
    });
    test('case 4', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-06-06', '2020-06-06']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(validPeriod)
        expect(isValid).toBeFalsy()
    });
    test('case 5', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-06-06', '2020-06-05']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(validPeriod)
        expect(isValid).toBeFalsy()
    });
    test('case 6', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['', '2020-02-01']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(['2020-03-03', '2020-02-01'])
        expect(isValid).toBeFalsy()
    });
    test('case 7', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['2020-03-04', '']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(['2020-03-04', '2021-02-02'])
        expect(isValid).toBeFalsy()
    });
    test('case 7', () => {
        const validPeriod = ['2020-03-03', '2021-02-02']
        const newPeriod = ['', '']
        const [period, isValid] = validatePeriod(validPeriod, newPeriod)
        expect(period).toEqual(validPeriod)
        expect(isValid).toBeFalsy()
    });    
});
