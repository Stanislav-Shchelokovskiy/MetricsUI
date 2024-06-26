import React, { useMemo } from 'react'
import NumericSelector from '../../../../common/components/NumericSelector'
import { useSelector, useDispatch } from 'react-redux'
import { SupportMetricsStore } from '../../../store/Store'
import { changePercentile, changePercentileInclude } from '../../../store/actions/SetCommon'
import { FilterParameter } from '../../../../common/store/multiset_container/sets/Interfaces'
import { getIncludeButtonOptions } from '../../../../common/components/Button'
import { useSetTitle } from '../../../../common/components/multiset_container/set/SetContext'
import { percentileSelector } from '../../../store/sets/Selectors'
import { booleanSetting } from '../../../../common/Typing'


export default function PercentileSelector() {
    const setTitle = useSetTitle()
    const onValueChange = (value: number | undefined) => changePercentile({ stateId: setTitle, data: value as number })
    const percentile = useSelector((store: SupportMetricsStore) => percentileSelector(store, setTitle) as FilterParameter<number>)

    const disabled = useSelector((store: SupportMetricsStore) =>
        booleanSetting(store.container.baselineAlignedModeEnabled)
    )

    const format = (value: number) => {
        return disabled ?
            'Not applicable' :
            `Select ${percentile.include ? '' : 'skip '}top ${Math.round(value)} %`
    }

    const dispatch = useDispatch()
    const onIncludeChange = (include: boolean) => {
        dispatch(changePercentileInclude({ stateId: setTitle, data: include }))
    }

    const customButtons = useMemo(() => [getIncludeButtonOptions(
        percentile.include,
        onIncludeChange,
        undefined,
        undefined,
        'verticalaligntop',
        'verticalalignbottom',
    )], [percentile.include])

    return <NumericSelector
        label='Percentile'
        className='OptionSelector'
        currentValue={percentile.value}
        max={100}
        defaultValue={100}
        format={format}
        onValueChange={onValueChange}
        disabled={disabled}
        customButtons={customButtons}
    />
}
