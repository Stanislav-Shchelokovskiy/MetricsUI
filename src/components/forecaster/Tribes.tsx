import React from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import { Tribe } from '../common/Interfaces'
import { useForecasterSelector, ForecasterStore } from './store/Store'
import TribeContainer from './Tribe'


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
    const selectedTribes = useForecasterSelector((state: ForecasterStore) => {
        return state.forecaster.tribes
    })

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
