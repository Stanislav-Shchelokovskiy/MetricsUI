import React, { useRef } from 'react'

import ScrollView from 'devextreme-react/scroll-view'
import TribeContainer, { Tribe } from './Tribe'

import { ForecasterState } from './store/ForecasterState'
import { useForecasterDispatch, useForecasterSelector } from './store/Hooks'

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
    const renderCount = useRef(0)
    console.log('TribesContainer render: ', renderCount.current++)

    const selectedTribes = useForecasterSelector((state: ForecasterState) => state.forecaster.selectedTribes)
    console.log('selectedTribes', selectedTribes)

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
