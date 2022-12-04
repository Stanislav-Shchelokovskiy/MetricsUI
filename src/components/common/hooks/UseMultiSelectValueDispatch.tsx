import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../Interfaces'
import { useAppDispatch } from '../AppStore'

export default function useMultiSelectValueDispatch<DataSourceT, DataSourceKeyT>(
    actionKey: string,
    action: (values: Payload<string, Array<DataSourceT>>) => PayloadAction<Payload<string, Array<DataSourceT>>>,
    dataSource: Array<DataSourceT>,
    dataSourceValueSelector: (value: DataSourceT, targetValue: DataSourceKeyT) => boolean) {
    const dispatch = useAppDispatch()
    return (values: Array<DataSourceKeyT>) => {
        const selectedValues = (values.map(value => dataSource.find(dsValue => dataSourceValueSelector(dsValue, value))) as Array<DataSourceT>)
        dispatch(action({ stateId: actionKey, data: selectedValues }))
    }
}
