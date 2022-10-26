import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import TribeContainer, { Tribe } from './Tribe'


export interface ForecastSettingsValues {
    replyTypes: Array<string>
    forecastHorizons: Array<string>
    tiles: Array<number>
}

export default function TribesContainer({ tribes, replyTypes, forecastHorizons, tiles }: { tribes: Array<Tribe> } & ForecastSettingsValues) {
    return (
        <div className='TribesContainer'>
            <ScrollView id='scrollview'
                showScrollbar='onHover'
                scrollByThumb={true}
                scrollByContent={true}
                height={'89vh'}
            >
                <div className='Tribes'>
                    {tribes?.map((tribe) => {
                        return <TribeContainer
                            key={tribe.id}
                            tribe={tribe}
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
