import {
    FORECASTER_END_POINT,
    SUPPORT_METRICS_END_POINT,
    COST_METRICS_END_POINT,
    QUERY_SERVICE_END_POINT,
    MSID_REDIRECT,
} from '../EndPoint'

const baseEndPoint = 'https://ubuntu-support.corp.devexpress.com'

describe('end points should not contain local urls.', () => {
    test('case 0', () => {
        expect(FORECASTER_END_POINT).toEqual(baseEndPoint + '/v1/Forecaster')
    });
    test('case 1', () => {
        expect(SUPPORT_METRICS_END_POINT).toEqual(baseEndPoint + '/v1/SupportMetrics')
    });
    test('case 2', () => {
        expect(COST_METRICS_END_POINT).toEqual(baseEndPoint + '/v1/CostMetrics')
    });
    test('case 3', () => {
        expect(QUERY_SERVICE_END_POINT).toEqual(baseEndPoint + '/v1/QueryService')
    });
    test('case 3', () => {
        expect(MSID_REDIRECT).toEqual(baseEndPoint)
    });
});
