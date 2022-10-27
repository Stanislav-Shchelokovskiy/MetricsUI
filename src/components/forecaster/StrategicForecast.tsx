import React, { useState } from 'react'
import Plot from 'react-plotly.js'
import SelectBox from 'devextreme-react/select-box'
import TagBox from 'devextreme-react/tag-box'
import { ForecastParams } from './Tribe'

interface ForecastSettingsValues {
    forecastHorizons: Array<string>
    tiles: Array<number>
}

interface ForecastSettings {
    forecastHorizon: string
    tile: number
}

type ForecastHorizonChangeCallable = (forecastHorizon: string) => void
type TileChangeCallable = (tile: number) => void

function PositionsSelector() {
    return (
        <TagBox className='PositionsSelector'
            placeholder='Select positions to filter by...'
            dataSource={['Support', 'Developer']}
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Display only positions'
            labelMode='static'
        />
    )
}

function Header(
    {
        forecastHorizons,
        tiles,
        forecastHorizon,
        tile,
        onForecastHorizonChange,
        onTileChange
    }:
        ForecastSettingsValues &
        ForecastSettings &
        { onForecastHorizonChange: ForecastHorizonChangeCallable } &
        { onTileChange: TileChangeCallable }
) {
    return (
        <div className='ForecastHeader'>
            <SelectBox
                dataSource={forecastHorizons}
                defaultValue={forecastHorizon}
                onValueChange={onForecastHorizonChange}
                label='Forecast Horizon'
                labelMode='static'
            />
            <SelectBox
                dataSource={tiles}
                defaultValue={tile}
                onValueChange={onTileChange}
                label='Performance Level'
                labelMode='static'
            />
            <PositionsSelector />
        </div>
    )
}

function Graph({ tribeID, incomeType }: ForecastParams) {
    return (
        <div className='ForecastGraph'>
            <Plot
                data={[
                    {
                        x: [1, 3],
                        y: [2, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    { type: 'bar', x: [2, 3], y: [5, 3] },
                ]}
                layout={{
                    height: 400, width: 1510, margin: {
                        t: 10,
                        l: 10,
                        r: 10,
                        b: 30
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
        </div>
    )
}

export default function StrategicForecast(
    {
        tribeID,
        incomeType,
        forecastHorizons,
        tiles
    }:
        ForecastParams &
        ForecastSettingsValues
) {
    const [forecastHorizon, setForecastHorizon] = useState<string>(forecastHorizons[0])
    const [tile, setTile] = useState<number>(tiles[tiles.length % 2])
    console.log(`forecastHorizon = ${forecastHorizon}`)
    console.log(`tile = ${tile}`)


    return (
        <div className='ForecastContainer'>
            <Header
                forecastHorizons={forecastHorizons}
                tiles={tiles}
                forecastHorizon={forecastHorizon}
                tile={tile}
                onForecastHorizonChange={setForecastHorizon}
                onTileChange={setTile} />
            <Body
                tribeID={tribeID}
                incomeType={incomeType} />
        </div>
    )
}
