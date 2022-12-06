import { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../AppStore'

export default function useMultiSelectValueDispatch<DataSourceT, DataSourceKeyT>(
    action: (values: Array<DataSourceT>) => PayloadAction<any>,
    dataSource: Array<DataSourceT>,
    dataSourceValueSelector: (value: DataSourceT, targetValue: DataSourceKeyT) => boolean
) {
    const dispatch = useAppDispatch()
    return (values: Array<DataSourceKeyT>) => {
        const selectedValues = (values.map(value => dataSource.find(dsValue => dataSourceValueSelector(dsValue, value))) as Array<DataSourceT>)
        dispatch(action(selectedValues))
    }
}

export function useSelectValueDispatch<DataSourceT, DataSourceKeyT>(
    action: (value: DataSourceT) => PayloadAction<any>,
    dataSource: Array<DataSourceT>,
    dataSourceValueSelector: (value: DataSourceT, targetValue: DataSourceKeyT) => boolean
) {
    const dispatch = useAppDispatch()
    return (value: DataSourceKeyT) => {
        const selectedValue = (dataSource.find(dsValue => dataSourceValueSelector(dsValue, value)) as DataSourceT)
        dispatch(action(selectedValue))
    }
}