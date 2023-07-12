import { getState } from '../components/state_management/ApplySharedState'

describe('testing ApplySharedState.getState: meaningful error should be returned in case of 403 and 404.', () => {
    test('case 0', () => {
        const res = getState()
        expect(res).toEqual({loaded: false, error: ''})
    });
    test('case 1', () => {
        const res = getState(true, 200)
        expect(res).toEqual({loaded: true, error: ''})
    });
    test('case 2', () => {
        const res = getState(true, 403)
        expect(res).toEqual({loaded: true, error: 'You are not authorized to apply this state.'})
    });
    test('case 3', () => {
        const res = getState(true, 404)
        expect(res).toEqual({loaded: true, error: 'State is not available.'})
    });
});
