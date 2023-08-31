import {
    FilterParametersNode,
    FilterParameterNode,
} from '../sets/Interfaces'
import {
    updateValues,
    updateValuesInclude,
    updateThreeStateValue,
    updateThreeStateValueInclude,
} from '../Utils'


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

describe('testing updateValuesInclude', () => {
    test('obj = undefined', () => {
        expect(updateValuesInclude(undefined, true)).toEqual(undefined)
        expect(updateValuesInclude(undefined, false)).toEqual({ include: false, values: [] })
    });
    test('obj != undefined && values = [] && include = true', () => {
        const obj: FilterParametersNode<number> = {
            include: false,
            values: []
        }
        expect(updateValuesInclude(obj, true)).toEqual(undefined)
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParametersNode<number> = {
            include: true,
            values: [1]
        }
        expect(updateValuesInclude(obj, false)).toEqual({ include: false, values: [1] })
    });
});

describe('testing updateThreeStateValue', () => {
    test('obj = undefined', () => {
        expect(updateThreeStateValue(undefined, undefined)).toEqual(undefined)
        expect(updateThreeStateValue(undefined, false)).toEqual({ include: true, value: false })
        expect(updateThreeStateValue(undefined, true)).toEqual({ include: true, value: true })
    });
    test('obj != undefined && include = true', () => {
        const obj: FilterParameterNode<boolean> = {
            include: true,
            value: true
        }
        expect(updateThreeStateValue(obj, false)).toEqual({ include: true, value: false })
        expect(updateThreeStateValue(obj, undefined)).toEqual(undefined)
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParameterNode<boolean> = {
            include: false,
            value: true
        }
        expect(updateThreeStateValue(obj, false)).toEqual(undefined)
        expect(updateThreeStateValue(obj, true)).toEqual(undefined)
        expect(updateThreeStateValue(obj, undefined)).toEqual(undefined)
    });
});

describe('testing updateThreeStateValueInclude', () => {
    test('obj = undefined', () => {
        expect(updateThreeStateValueInclude(undefined, true, false)).toEqual({ include: true, value: false })
        expect(updateThreeStateValueInclude(undefined, true, true)).toEqual({ include: true, value: true })
        expect(updateThreeStateValueInclude(undefined, false, false)).toEqual(undefined)
        expect(updateThreeStateValueInclude(undefined, false, true)).toEqual(undefined)
    });
    test('obj != undefined && include = true', () => {
        const obj: FilterParameterNode<boolean> = {
            include: false,
            value: false
        }
        expect(updateThreeStateValueInclude(obj, true, true)).toEqual({ include: true, value: false })
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParameterNode<boolean> = {
            include: false,
            value: false
        }
        expect(updateThreeStateValueInclude(obj, false, true)).toEqual(undefined)
    });
});
