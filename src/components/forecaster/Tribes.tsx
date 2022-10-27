import React from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import TribeContainer, { Tribe } from './Tribe'


export interface ForecastSettingsValues {
    replyTypes: Array<string>
    forecastHorizons: Array<string>
    tiles: Array<number>
}

export default function TribesContainer(
    {
        tribes,
        incomeType,
        replyTypes,
        forecastHorizons,
        tiles
    }:
        { tribes: Array<Tribe> } &
        { incomeType: string } &
        ForecastSettingsValues
) {
    return (
        <div className='TribesContainer'>
            <ScrollView
                id='scrollview'
                showScrollbar='onHover'
                scrollByThumb={true}
                scrollByContent={false}
                height={'89vh'}
            >
                <div className='Tribes'>
                    {tribes?.map((tribe) => {
                        return <TribeContainer
                            key={tribe.id}
                            tribe={tribe}
                            incomeType={incomeType}
                            replyTypes={replyTypes}
                            forecastHorizons={forecastHorizons}
                            tiles={tiles}
                        />
                    })}
                </div>
            </ScrollView>
        </div >
    )
}
