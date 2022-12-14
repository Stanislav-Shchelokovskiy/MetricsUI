import React from 'react'
import { OptionSelector } from '../../common/components/OptionSelector'
import { useCustomersActivityDispatch, useCustomersActivitySelector, CustomersActivityStore } from '../store/Store'


export default function StatesSelector() {
    const viewState = useCustomersActivitySelector((state: CustomersActivityStore) => state.viewState)
    //   const stateSelector = (store: ForecasterStore) => store.strategicForecast.find(x => x.tribeId === tribeId)?.tile
    //  const defaultValueSelector = (values: Array<number>) => values[values.length % 2]
    const onValueChange = (value: string) => { }

    return <OptionSelector<string, string>
        className='CustomersActivityViewStatesSelector'
        dataSource={viewState.stateKeys}
        defaultValue={viewState.key || viewState.stateKeys[0]}
        onValueChange={onValueChange}
        label='View'
    />
}