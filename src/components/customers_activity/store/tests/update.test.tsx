import { updateValues, updateInclude, FilterParametersNode } from '../SetsReducer'


describe('testing updateValues', () => {
    test('obj = undefined', () => {
        expect(updateValues(undefined, [])).toEqual(undefined)
        expect(updateValues(undefined, undefined)).toEqual(undefined)
        expect(updateValues(undefined, [1])).toEqual({ include: true, values: [1] })
    });
    test('obj != undefined && include = true', () => {
        const obj: FilterParametersNode<number> = {
            include: true,
            values: [1]
        }
        expect(updateValues(obj, [])).toEqual(undefined)
        expect(updateValues(obj, undefined)).toEqual(undefined)
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParametersNode<number> = {
            include: false,
            values: [1]
        }
        expect(updateValues(obj, [])).toEqual({ include: false, values: [] })
        expect(updateValues(obj, undefined)).toEqual({ include: false, values: [] })
        expect(updateValues(obj, [2])).toEqual({ include: false, values: [2] })
    });
});

describe('testing updateInclude', () => {
    test('obj = undefined', () => {
        expect(updateInclude(undefined, true)).toEqual(undefined)
        expect(updateInclude(undefined, false)).toEqual({ include: false, values: [] })
    });
    test('obj != undefined && values = [] && include = true', () => {
        const obj: FilterParametersNode<number> = {
            include: false,
            values: []
        }
        expect(updateInclude(obj, true)).toEqual(undefined)
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParametersNode<number> = {
            include: true,
            values: [1]
        }
        expect(updateInclude(obj, false)).toEqual({ include: false, values: [1] })
    });
});
