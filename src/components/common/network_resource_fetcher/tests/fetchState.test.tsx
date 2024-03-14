import { convertPull } from '../FetchState'


describe('testing convertPull: undefined should be returned in all cases when status code != 200.', () => {
    test('case 0', () => {
        const res = convertPull(undefined)
        expect(res).toEqual([500, undefined])
    });
    test('case 1', () => {
        const res = convertPull([200, {}])
        expect(res).toEqual([200, {}])
    });
    test('case 2', () => {
        const res = convertPull([200, 'qwe'])
        expect(res).toEqual([200, 'qwe'])
    });
    test('case 3', () => {
        const res = convertPull([403, {}])
        expect(res).toEqual([403, undefined])
    });
    test('case 4', () => {
        const res = convertPull([404, {}])
        expect(res).toEqual([404, undefined])
    });
});
