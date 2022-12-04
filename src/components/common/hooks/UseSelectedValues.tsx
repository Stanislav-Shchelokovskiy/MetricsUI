import { useAppSelector, AppStore } from '../../common/AppStore'

export default function useSelectedValues<DataSourceT, DataSourceKeyT>(
    stateSelector: (store: AppStore) => Array<DataSourceT>,
    valueKeySelector: (value: DataSourceT) => DataSourceKeyT
) {
    const selectedValues = useAppSelector(stateSelector)
    return selectedValues?.map(valueKeySelector)
}
