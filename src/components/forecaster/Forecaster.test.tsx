import React from 'react';
import { screen, render } from '@testing-library/react';
import Forecaster from './Forecaster';

const fetchForecastSettingsValues = require('./network_resource_fetcher/FetchForecastSettingsValues')
const tribes = [{ 'id': '46ABE8AA-E6BB-4D47-AAC6-AADF8B689619', 'name': 'App Frameworks (UI, API, ORM)' }, { 'id': '44763D87-A7DD-499B-8D43-92E767D5BA0E', 'name': 'ASP' }]

beforeEach(() => {
    jest.spyOn(fetchForecastSettingsValues, 'FetchForecastSettingsValues').mockResolvedValue(
        {
            success: true,
            data: {
                incomeTypes: ['Regular', 'AT'],
                replyTypes: ['Support only', 'Support & Team', 'Support & Secondary Tribe Support', 'Support & Team & Secondary Tribe Support'],
                tiles: [3, 4, 5],
                dailyForecastHorizons: ['D_14', 'D_90'],
                tribes: tribes,
            }
        }
    )
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('initial state', async () => {
    render(<Forecaster />)
    expect(screen.getByTestId('LoadIndicator')).toBeInTheDocument()
    expect(await screen.findByTestId('Menu')).toBeInTheDocument()
})
