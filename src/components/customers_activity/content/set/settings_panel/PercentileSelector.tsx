import React, { useRef, useMemo } from 'react'
import { NumberBox, Button as NumberBoxButton } from 'devextreme-react/number-box'
import { useSelector, useDispatch } from 'react-redux'
import { CustomersActivityStore } from '../../../store/Store'
import { changePercentile, changePercentileInclude } from '../../../store/Actions'
import { FilterParameterNode } from '../../../store/SetsReducer'
import { getIncludeButtonOptions } from '../../../../common/components/Button'


export default function PercentileSelector({ setTitle }: { setTitle: string }) {
    const ref = useRef<NumberBox>(null)
    const percentile = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.percentile as FilterParameterNode<number>
    )

    const disabled = useSelector((store: CustomersActivityStore) =>
        store.customersActivity.baselineAlignedModeEnabled
    )

    const format = (value: number) => {
        return disabled ?
            'Not applicable' :
            `Select ${percentile.include ? '' : 'skip '}top ${Math.round(value)} %`
    }

    const dispatch = useDispatch()
    let timerId: NodeJS.Timeout | undefined = undefined
    const onValueChange = (value: number) => {
        if (timerId !== undefined)
            clearTimeout(timerId)
        timerId = setTimeout(() => {
            dispatch(changePercentile({ stateId: setTitle, data: value }))
            clearTimeout(timerId)
        }, 1000)
    }

    const onIncludeChange = (include: boolean) => {
        dispatch(changePercentileInclude({ stateId: setTitle, data: include }))
    }

    const topBottomButtonOptions = useMemo(() => getIncludeButtonOptions(
        'include',
        'before',
        percentile.include,
        'verticalaligntop',
        'verticalalignbottom',
        onIncludeChange
    ), [percentile.include])
    
    const maxValue = 100
    const resetButtonOptions = {
        text: '',
        stylingMode: 'text',
        icon: 'revert',
        focusStateEnabled: false,
        elementAttr: {
            id: 'PercentileSelector_resetButton'
        },
        onClick: (e: any) => {
            ref.current?.instance.option('value', maxValue)
        }
    }

    return <NumberBox
        className='CustomersActivity_PercentileSelector'
        ref={ref}
        defaultValue={percentile.value}
        step={5}
        min={0}
        max={maxValue}
        format={format}
        showSpinButtons={true}
        useLargeSpinButtons={true}
        onValueChange={onValueChange}
        disabled={disabled}
        mode='number'>
        <NumberBoxButton
            name={topBottomButtonOptions.name}
            location={topBottomButtonOptions.location}
            options={topBottomButtonOptions} />
        <NumberBoxButton name='spins' />
        <NumberBoxButton
            name='reset'
            options={resetButtonOptions} />
    </NumberBox>
}
