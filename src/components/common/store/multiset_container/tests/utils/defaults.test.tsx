import {
    definedValueOrDefault,
    paramOrDefault,
} from '../../Utils'


describe('testing definedValueOrDefault', () => {
    test('obj is empty', () => {
        expect(definedValueOrDefault(undefined, [])).toEqual([])
        expect(definedValueOrDefault(null, [])).toEqual([])
        expect(definedValueOrDefault([], ['qwe'])).toEqual([])
        expect(definedValueOrDefault(false, true)).toEqual(false)
        expect(definedValueOrDefault('', 'qwe')).toEqual('')
    });
    test('obj is not empty', () => {
        expect(definedValueOrDefault(['qwe'], [])).toEqual(['qwe'])
        expect(definedValueOrDefault('qwe', 'asd')).toEqual('qwe')
        expect(definedValueOrDefault(true, false)).toEqual(true)
    });
});
