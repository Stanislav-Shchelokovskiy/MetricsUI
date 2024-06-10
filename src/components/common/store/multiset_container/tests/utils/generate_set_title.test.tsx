import { generateSetTitle } from '../../Utils'

describe('testing generateNewSetTitle', () => {
    test('case 0', () => {
        const sets: Array<string> = []
        expect(generateSetTitle(sets)).toEqual('Set 0')
    });
    test('case 1', () => {
        const sets: Array<string> = ['Set 0']
        expect(generateSetTitle(sets)).toEqual('Set 1')
    });
    test('case 2', () => {
        const sets: Array<string> = ['Set 1']
        expect(generateSetTitle(sets)).toEqual('Set 2')
    });
    test('case 3', () => {
        const sets: Array<string> = ['Set 1', 'Set 2']
        expect(generateSetTitle(sets)).toEqual('Set 3')
    });
    test('case 4', () => {
        const sets: Array<string> = ['Set 2', 'Set 3']
        expect(generateSetTitle(sets)).toEqual('Set 4')
    });
    test('case 5', () => {
        const sets: Array<string> = ['Set 3']
        expect(generateSetTitle(sets)).toEqual('Set 1')
    });
    test('case 6', () => {
        const sets: Array<string> = []
        expect(generateSetTitle(sets, 'title')).toEqual('title')
    });
    test('case 7', () => {
        const sets: Array<string> = ['title']
        expect(generateSetTitle(sets, 'title')).toEqual('title1')
    });
    test('case 8', () => {
        const sets: Array<string> = ['title', 'title1']
        expect(generateSetTitle(sets, 'title')).toEqual('title2')
    });
    test('case 9', () => {
        const sets: Array<string> = ['title1', 'title2']
        expect(generateSetTitle(sets, 'title')).toEqual('title')
    });
});
