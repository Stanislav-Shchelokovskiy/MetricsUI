import React, { useState } from 'react'
import Plot from 'react-plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
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
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true}
                container='#tribe_accordion' />
        </TagBox>
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
                labelMode='static'>
                <DropDownOptions 
                    hideOnOutsideClick={true} 
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
            <SelectBox
                dataSource={tiles}
                defaultValue={tile}
                onValueChange={onTileChange}
                label='Performance Level'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true} 
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
            <PositionsSelector />
        </div>
    )
}

function Graph({ tribeID, incomeType }: ForecastParams) {
    return (
        <div className='ForecastGraph'>
            <Plot
                data={[
                    // {
                    //     x: tribe_load_forecast[ForecastMeta.ds],
                    //     y: tribe_load_forecast[ForecastMeta.y],
                    //     type: 'scatter',
                    //     name: 'fact',
                    //     line_color: palette.get_color('fact'),
                    //     line_shape: 'spline',
                    //     hovertemplate: 'Fact: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                    //     connectgaps: true,
                    // },
                    // {
                    //     x: tribe_load_forecast[ForecastMeta.ds],
                    //     y: tribe_load_forecast[ForecastMeta.yhat_rmse_upper],
                    //     name: 'forecast_upper',
                    //     showlegend: false,
                    //     line_color: palette.get_color('forecast_boundary'),
                    //     line_shape: 'spline',
                    //     hovertemplate: 'Forecast upper: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                    //     connectgaps: true,
                    // },
                    // {
                    //     x: tribe_load_forecast[ForecastMeta.ds],
                    //     y: tribe_load_forecast[ForecastMeta.yhat],
                    //     name: 'forecast',
                    //     fill: 'tonexty',
                    //     line_color: color_palette.get_color('forecast'),
                    //     fillcolor: color_palette.get_color('forecast_fill'),
                    //     line_shape: 'spline',
                    //     hovertemplate: 'Forecast: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                    //     connectgaps: True,
                    // }, {
                    //     x: tribe_load_forecast[ForecastMeta.ds],
                    //     y: tribe_load_forecast[ForecastMeta.yhat_rmse_lower],
                    //     name: 'forecast_lower',
                    //     fill: 'tonexty',
                    //     showlegend: False,
                    //     line_color: color_palette.get_color('forecast_boundary'),
                    //     fillcolor: color_palette.get_color('forecast_fill'),
                    //     line_shape: 'spline',
                    //     hovertemplate: 'Forecast lower: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                    //     connectgaps: True,
                    // }
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
