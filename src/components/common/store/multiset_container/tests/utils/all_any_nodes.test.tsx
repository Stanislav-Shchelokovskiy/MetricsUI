import { FilterParameters } from '../../sets/Interfaces'
import {
    allNodesAreConsideredEmpty,
    anyNodeIsConsideredEmpty,
    anyValueIsEmpty,
    nodeIsEmpty,
} from '../../Utils'

describe('testing allNodesAreConsideredEmpty: nodes are empty if include of all nodes is true and no one node contains a value ', () => {
    test('case 0', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: true, values: [] }, { include: true, values: [] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 1', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: true, values: [] }, { include: true, values: [1] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 2', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [] }, { include: true, values: [] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 3', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [] }, { include: true, values: [1] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 4', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [1] }, { include: true, values: [1] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 5', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [1] }, { include: true, values: [] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 6', () => {
        const nodes: Array<FilterParameters<number> | undefined> = [{ include: false, values: [1] }, undefined]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 7', () => {
        const nodes: Array<FilterParameters<number> | undefined> = [undefined, undefined]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeTruthy()
    });
});

describe('testing anyNodeIsConsideredEmpty: any node is empty if include of any nodes is true and the node does not contain a value ', () => {
    test('case 0', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: true, values: [] }, { include: true, values: [] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 1', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: true, values: [] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 2', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [] }, { include: true, values: [] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 3', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 4', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [1] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 5', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: false, values: [1] }, { include: true, values: [] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 6', () => {
        const nodes: Array<FilterParameters<number>> = [{ include: true, values: [1] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 7', () => {
        const nodes: Array<FilterParameters<number> | undefined> = [undefined, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 7', () => {
        const nodes: Array<FilterParameters<number> | undefined> = [undefined, undefined]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
});

describe(`testing nodeIsEmpty: 
* node is empty if it is either undefined
* [include=true and values=empty array]
* its values dont include must have value
* its include=false and values include must have value `, () => {
    test('case 0', () => {
        expect(nodeIsEmpty(undefined)).toBeTruthy()
    });
    test('case 1', () => {
        expect(nodeIsEmpty({ include: true, values: [] })).toBeTruthy()
    });
    test('case 2', () => {
        expect(nodeIsEmpty({ include: true, values: [1, 3] }, 2)).toBeTruthy()
    });
    test('case 3', () => {
        expect(nodeIsEmpty({ include: true, values: [1, 3] }, 3)).toBeFalsy()
    });
    test('case 4', () => {
        expect(nodeIsEmpty({ include: false, values: [1, 3] }, 2)).toBeFalsy()
    });
    test('case 5', () => {
        expect(nodeIsEmpty({ include: false, values: [1, 3] }, 3)).toBeTruthy()
    });
});

describe('testing anyValueIsEmpty: any value is empty if it is either undefined, null or empty string ', () => {
    test('case 0', () => {
        const nodes: Array<any> = [1, undefined]
        expect(anyValueIsEmpty(...nodes)).toBeTruthy()
    });
    test('case 1', () => {
        const nodes: Array<any> = [null, 1]
        expect(anyValueIsEmpty(...nodes)).toBeTruthy()
    });
    test('case 2', () => {
        const nodes: Array<any> = [1, '']
        expect(anyValueIsEmpty(...nodes)).toBeTruthy()
    });
    test('case 3', () => {
        const nodes: Array<any> = [1, 'qwe']
        expect(anyValueIsEmpty(...nodes)).toBeFalsy()
    });
});
