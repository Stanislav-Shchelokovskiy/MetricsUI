import React from 'react'

import ScrollView from 'devextreme-react/scroll-view'
import TribeContainer, { Tribe } from './Tribe'

import {
    useForecasterSelector,
    ForecasterStore
} from './store/ForecasterStore'

interface TribeContainerState {
    incomeType: string
    replyTypes: Array<string>
    defaultReplyType: string
    dailyForecastHorizons: Array<string>
    defaultDailyForecastHorizon: string
    tiles: Array<number>
    defaultTile: number
    lastUpdate: number
}

export interface TribesTribeContainerState extends TribeContainerState {
    tribes: Array<Tribe>
}

export default function TribesContainer() {
    const selectedTribes = useForecasterSelector((state: ForecasterStore) => state.forecaster.selectedTribes)

    if (selectedTribes?.length > 0) {
        return (
            <div data-testid='TribesContainer' className='TribesContainer'>
                <ScrollView
                    id='scrollview'
                    showScrollbar='onHover'
                    scrollByThumb={true}
                    scrollByContent={false}
                    height={'89vh'}
                >
                    <div className='Tribes'>
                        {selectedTribes?.map((tribe) => {
                            return <TribeContainer
                                key={tribe.id}
                                tribe={tribe}
                            />
                        })}
                    </div>
                </ScrollView>
            </div >
        )
    }
    return null
}
