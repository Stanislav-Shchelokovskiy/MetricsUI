import { toDate } from '../Utils'


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
