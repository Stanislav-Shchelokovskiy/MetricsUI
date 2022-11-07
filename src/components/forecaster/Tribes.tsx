import React from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import TribeContainer, { Tribe } from './Tribe'

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

export default function TribesContainer({ state }: { state: TribesTribeContainerState }) {
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
                    {state.tribes?.map((tribe) => {
                        return <TribeContainer
                            key={tribe.id}
                            state={{ tribe: tribe, ...state, }}
                        />
                    })}
                </div>
            </ScrollView>
        </div >
    )
}
