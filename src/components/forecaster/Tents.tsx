import React from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import { Tribe } from '../common/Interfaces'
import { useForecasterSelector, ForecasterStore } from './store/Store'
import TentContainer from './Tent'


interface TentContainerState {
    incomeType: string
    replyTypes: Array<string>
    defaultReplyType: string
    dailyForecastHorizons: Array<string>
    defaultDailyForecastHorizon: string
    tiles: Array<number>
    defaultTile: number
    lastUpdate: number
}

export interface TentsContainerState extends TentContainerState {
    tents: Array<Tribe>
}


export default function TentsContainer() {
    const selectedTribes = useForecasterSelector((state: ForecasterStore) => {
        return state.forecaster.tents
    })

    if (selectedTribes?.length > 0) {
        return (
            <div className='TentsContainer'>
                <ScrollView
                    id='scrollview'
                    showScrollbar='onHover'
                    scrollByThumb={true}
                    scrollByContent={false}
                    height={'89vh'}
                >
                    <div className='Tribes'>
                        {selectedTribes?.map((tribe) => {
                            return <TentContainer
                                key={tribe.id}
                                tent={tribe}
                            />
                        })}
                    </div>
                </ScrollView>
            </div >
        )
    }
    return null
}
