import React, { useState } from 'react'
import Plot from 'react-plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import { ForecastParams } from './Tribe'
import { RepliesForecast } from './Forecaster'

interface ForecastSettingsValues {
    replyTypes: Array<string>
}

interface ForecastSettings {
    replyType: string
}

type ReplyTypeChangeCallable = (replyType: string) => void

function Header(
    {
        replyTypes,
        replyType,
        onReplyTypeChange
    }:
        ForecastSettingsValues &
        ForecastSettings &
        { onReplyTypeChange: ReplyTypeChangeCallable }
) {
    return (
        <div className='ForecastHeader'>
            <SelectBox
                dataSource={replyTypes}
                defaultValue={replyType}
                onValueChange={onReplyTypeChange}
                label='Forecast Mode'
                labelMode='static'
                width={'22%'}>
                <DropDownOptions 
                    hideOnOutsideClick={true} 
                    hideOnParentScroll={true} />
            </SelectBox>
        </div>
    )
}

function Metric() {
    return (
        <div className='TacticalForecastMetric'>
            <Plot
                data={[
                    { type: 'bar', x: [1], y: [2] },
                ]}
                layout={{ width: 300, height: 300, title: 'A Fancy Plot' }}
            />
        </div>
    )
}

function Graph({ tribeID, incomeType }: ForecastParams) {
    return (
        <div className='ForecastGraph'>
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{
                    height: 300, width: 1200, margin: {
                        t: 10,
                        l: 10,
                        r: 10,
                    },
                }}
            />
        </div>
    )
}

function Body({ tribeID, incomeType }: ForecastParams) {
    return (
        <div className='ForecastBody'>
            <Graph
                tribeID={tribeID}
                incomeType={incomeType} />
            <Metric />
        </div>
    )
}

export default function TacticalForecast(
    {
        tribeID,
        incomeType,
        replyTypes
    }:
        ForecastParams &
        ForecastSettingsValues
) {
    const [replyType, setReplyType] = useState<string>(replyTypes[0])
    console.log(`replyType = ${replyType}`)

    return (
        <div className='ForecastContainer'>
            <Header
                replyTypes={replyTypes}
                replyType={replyType}
                onReplyTypeChange={setReplyType} />
            <Body
                tribeID={tribeID}
                incomeType={incomeType} />
        </div>
    )
}
