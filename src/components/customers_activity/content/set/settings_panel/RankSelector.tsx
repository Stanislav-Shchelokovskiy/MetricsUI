import React, { useRef } from 'react'
import { NumberBox, Button as NumberBoxButton } from 'devextreme-react/number-box'
import { useSelector, useDispatch } from 'react-redux'
import { CustomersActivityStore } from '../../../store/Store'
import { changeSelectTop } from '../../../store/Actions'


export default function RankSelector({ setTitle }: { setTitle: string }) {
    const ref = useRef<NumberBox>(null)
    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.selectTop as number
    )

    const disabled = useSelector((store: CustomersActivityStore) =>
        store.customersActivity.trackedCustomersGroupsModeEnabled
    )

    const format = (value: number) => disabled ? 'Not applicable' : `Select top ${Math.round(value)} %`

    const dispatch = useDispatch()
    let timerId: NodeJS.Timeout | undefined = undefined
    const onValueChange = (value: number) => {
        if (timerId !== undefined)
            clearTimeout(timerId)
        timerId = setTimeout(() => {
            dispatch(changeSelectTop({ stateId: setTitle, data: value }))
            clearTimeout(timerId)
        }, 1000)
    }

    const resetButtonOptions = {
        text: '',
        stylingMode: 'text',
        icon: 'revert',
        focusStateEnabled: false,
        elementAttr: {
            id: 'RankSelector_resetButton'
        },
        onClick: (e: any) => {
            ref.current?.instance.option('value', 100)
        }
    }

    return <NumberBox
        className='CustomersActivity_RankSelector'
        ref={ref}
        defaultValue={value}
        step={5}
        min={0}
        max={100}
        format={format}
        showSpinButtons={true}
        useLargeSpinButtons={true}
        onValueChange={onValueChange}
        disabled={disabled}
        mode='number'>
        <NumberBoxButton name='spins' />
        <NumberBoxButton
            name='reset'
            options={resetButtonOptions} />
    </NumberBox>
}
