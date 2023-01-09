import { allNodesAreConsideredEmpty, anyNodeIsConsideredEmpty } from '../store/Utils'
import { FilterParametersNode } from '../store/SetsReducer'


describe('testing allNodesAreConsideredEmpty: nodes are empty if include of all nodes is true and no one node contains a value ', () => {
    test('case 0', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: true, values: [] }, { include: true, values: [] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 1', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: true, values: [] }, { include: true, values: [1] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 2', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [] }, { include: true, values: [] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 3', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [] }, { include: true, values: [1] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 4', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [1] }, { include: true, values: [1] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 5', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [1] }, { include: true, values: [] }]
        expect(allNodesAreConsideredEmpty(...nodes)).toBeFalsy()
    });
});

describe('testing anyNodeIsConsideredEmpty: any node is empty if include of any nodes is true and the node does not contain a value ', () => {
    test('case 0', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: true, values: [] }, { include: true, values: [] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 1', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: true, values: [] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 2', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [] }, { include: true, values: [] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 3', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 4', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [1] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeFalsy()
    });
    test('case 5', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: false, values: [1] }, { include: true, values: [] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeTruthy()
    });
    test('case 6', () => {
        const nodes: Array<FilterParametersNode<number>> = [{ include: true, values: [1] }, { include: true, values: [1] }]
        expect(anyNodeIsConsideredEmpty(...nodes)).toBeFalsy()
    });
});