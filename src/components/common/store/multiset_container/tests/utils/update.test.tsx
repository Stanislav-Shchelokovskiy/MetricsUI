import {
    FilterParameters,
    FilterParameter,
} from '../../sets/Interfaces'
import {
    updateSetState,
    updateSetStateEnsureVal,
    updateValues,
    updateValuesInclude,
    updateThreeStateValue,
    updateThreeStateValueInclude,
} from '../../Utils'

import { BaseSetState } from '../../sets/Interfaces'
import { getDefaultBaseSet, getFilterParameters } from '../../sets/Defaults';

describe('testing updateSetState', () => {
    test('set found', () => {
        const state1: BaseSetState = getDefaultBaseSet()
        state1.title = 'state1'
        const state2: BaseSetState = getDefaultBaseSet()
        state2.title = 'state2'
        const states = [state1, state2]
        const tents = ['tent1', 'tent2']

        const got = updateSetState(state1.title, states, (x) => {
            return {
                ...x,
                empTents: getFilterParameters(tents)
            }
        })

        const want = [{
            ...state1,
            empTents: getFilterParameters(tents)
        }, state2]

        expect(got).toEqual(want)
    });

    test('set  not found', () => {
        const state1: BaseSetState = getDefaultBaseSet()
        state1.title = 'state1'
        const state2: BaseSetState = getDefaultBaseSet()
        state2.title = 'state2'
        const states = [state1, state2]
        const tents = ['tent1', 'tent2']

        const got = updateSetState('not found', states, (x) => {
            return {
                ...x,
                empTents: getFilterParameters(tents)
            }
        })

        const want = states

        expect(got).toEqual(want)
    });
});

describe('testing updateSetStateEnsureVal', () => {
    test('not empty val', () => {
        const state1: BaseSetState = getDefaultBaseSet()
        state1.title = 'state1'
        const state2: BaseSetState = getDefaultBaseSet()
        state2.title = 'state2'
        const states = [state1, state2]
        const tents = ['tent1', 'tent2']
        const defaultTents = ['tent3']

        const got = updateSetStateEnsureVal(state1.title, states, (set) => set?.empTents?.values, tents, defaultTents, (set, newVal) => {
            return {
                ...set,
                empTents: getFilterParameters(newVal)
            }
        })

        const want = [{
            ...state1,
            empTents: getFilterParameters(tents)
        }, state2]

        expect(got).toEqual(want)
    });

    test('equal vals', () => {
        const tents = ['tent1', 'tent2']
        const defaultTents = ['tent3']

        const state1: BaseSetState = getDefaultBaseSet()
        state1.title = 'state1'
        state1.empTents = getFilterParameters(tents)
        const state2: BaseSetState = getDefaultBaseSet()
        state2.title = 'state2'
        const states = [state1, state2]

        const got = updateSetStateEnsureVal(state1.title, states, (set) => set?.empTents?.values, tents, defaultTents, (set, newVal) => {
            return {
                ...set,
                empTents: getFilterParameters(newVal)
            }
        })

        expect(got).toBe(states)
    });

    test('empty val', () => {
        const state1: BaseSetState = getDefaultBaseSet()
        state1.title = 'state1'
        const state2: BaseSetState = getDefaultBaseSet()
        state2.title = 'state2'
        const states = [state1, state2]
        const defaultTents = ['tent3']

        const got1 = updateSetStateEnsureVal(state1.title, states, (set) => set?.empTents?.values, [], defaultTents, (set, newVal) => {
            return {
                ...set,
                empTents: getFilterParameters(newVal)
            }
        })

        const got2 = updateSetStateEnsureVal(state2.title, states, (set) => set?.empTents?.values, undefined, defaultTents, (set, newVal) => {
            return {
                ...set,
                empTents: getFilterParameters(newVal)
            }
        })

        const want1 = [{
            ...state1,
            empTents: getFilterParameters(defaultTents)
        }, state2]

        const want2 = [state1, {
            ...state2,
            empTents: getFilterParameters(defaultTents)
        }]

        expect(got1).toEqual(want1)
        expect(got2).toEqual(want2)
    });
});

describe('testing updateValues', () => {
    test('obj = undefined', () => {
        expect(updateValues(undefined, [])).toEqual(undefined)
        expect(updateValues(undefined, undefined)).toEqual(undefined)
        expect(updateValues(undefined, [1])).toEqual({ include: true, values: [1] })
    });
    test('obj != undefined && include = true', () => {
        const obj: FilterParameters<number> = {
            include: true,
            values: [1]
        }
        expect(updateValues(obj, [])).toEqual(undefined)
        expect(updateValues(obj, undefined)).toEqual(undefined)
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParameters<number> = {
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
        const obj: FilterParameters<number> = {
            include: false,
            values: []
        }
        expect(updateValuesInclude(obj, true)).toEqual(undefined)
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParameters<number> = {
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
        const obj: FilterParameter<boolean> = {
            include: true,
            value: true
        }
        expect(updateThreeStateValue(obj, false)).toEqual({ include: true, value: false })
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
        const obj: FilterParameter<boolean> = {
            include: false,
            value: false
        }
        expect(updateThreeStateValueInclude(obj, true, true)).toEqual({ include: true, value: false })
    });
    test('obj != undefined && include = false', () => {
        const obj: FilterParameter<boolean> = {
            include: false,
            value: false
        }
        expect(updateThreeStateValueInclude(obj, false, true)).toEqual(undefined)
    });
});
