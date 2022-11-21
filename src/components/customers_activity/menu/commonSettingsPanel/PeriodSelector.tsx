import React from 'react'
import { RangeSelector as DxRangeSelector, Margin, Scale, MinorTick, SliderMarker } from 'devextreme-react/range-selector'

const startValue = new Date(2011, 1, 1)
const endValue = new Date(2013, 6, 1)
const range = [new Date(2011, 1, 5), new Date(2011, 2, 5)]

export default function PeriodSelector() {
    return (
        <DxRangeSelector
            id='range-selector'
            //title='Select Period'
            defaultValue={range}
            className='CustomersActivity_PeriodSelector'
            size={{ height: 125 }}
        >
            <Margin top={10} />
            <Scale
                startValue={startValue}
                endValue={endValue}
                minorTickInterval='week'
                tickInterval='month'
                minRange='week'
            //maxRange='month'
            >
                <MinorTick visible={false} />
            </Scale>
            <SliderMarker format='monthAndDay' />
        </DxRangeSelector>
    )
}
