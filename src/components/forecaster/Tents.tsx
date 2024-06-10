import React from 'react'
import { useSelector } from 'react-redux'
import ScrollView from 'devextreme-react/scroll-view'
import { Knot } from '../common/Typing'
import TentContainer from './tent/Tent'
import { tentsSelector } from './store/forecaster/Selectors'


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
    tents: Array<Knot>
}


export default function TentsContainer() {
    const selectedTents = useSelector(tentsSelector)

    if (selectedTents?.length > 0) {
        return (
            <div className='TentsContainer'>
                <ScrollView
                    id='scrollview'
                    showScrollbar='onHover'
                    scrollByThumb={true}
                    scrollByContent={false}
                    height={'89vh'}
                >
                    <div className='Tents'>
                        {selectedTents?.map((tent) => {
                            return <TentContainer
                                key={tent.id}
                                tent={tent}
                            />
                        })}
                    </div>
                </ScrollView>
            </div >
        )
    }
    return null
}
