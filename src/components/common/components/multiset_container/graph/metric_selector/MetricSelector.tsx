import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import { useSelector } from 'react-redux'
import DataSource from 'devextreme/data/data_source'
import OptionSelector from '../../../OptionSelector'
import { changeMetric } from '../../../../store/multiset_container/Actions'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../../../../store/multiset_container/Utils'
import { useMultisetContainerContext } from '../../MultisetContainerContext'
import { metricSelector } from '../../../../store/multiset_container/Selectors'
import { Undefinable } from '../../../../Typing'
import { getFavoritesButtonOptions } from '../../../Button'
import { favoriteMetricsSelector } from '../../../../store/multiset_container/non_shareable_state/Selectors'
import MetricsPopup from './Popup'
import { Metric } from './Metric'
import {
    stateReducer,
    INITIAL_STATE,
    changeMetric as _changeMetric,
    openCustomPopup,
    openDefaultPopup,
    hidePopup,
} from './Reducer'


export default function MetricSelector() {
    const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE)

    const context = useMultisetContainerContext()
    const defaultValueSelector = useCallback((values: Array<Metric>) => values.find(x => x.context === context.context)?.name || values[0]?.name, [])
    const onValueChangeEx = useCallback((dsVal: Metric) => { dispatch(_changeMetric(dsVal)) }, [])

    useEffect(() => {
        if (state.metric)
            context.changeMetric(state.metric)
    }, [state.metric])

    const favoriteMetrics = useSelector(favoriteMetricsSelector)

    const onPopupShowing = useCallback((
        dataSource: DataSource<Metric, string>,
        value: string,
        dispatchValue: (value: string) => void,
        setFilter: (filter: Array<any> | null) => void,
        cancelDefault: () => void,
        onHiding: () => void
    ) => {
        if (state.defaultPopupOpened) {
            const metricName = 'name'
            const newFilter: Array<any> = [[metricName, '=', value]]
            for (const filterVal of favoriteMetrics) {
                newFilter.push('or')
                newFilter.push([metricName, '=', filterVal])
            }
            setFilter(newFilter)
            return
        }

        cancelDefault()

        setFilter(null)
        dispatch(openCustomPopup({
            dataSource: dataSource,
            value: value,
            dispatchValue: dispatchValue,
            visible: true,
            onHiding: onHiding,
            favoriteMetrics: favoriteMetrics,
        }))
    }, [state.defaultPopupOpened, favoriteMetrics])


    const onHiding = useCallback(() => {
        dispatch(hidePopup(undefined))
    }, [])


    const customButtons = useMemo(() => [{
        ...getFavoritesButtonOptions(),
        onClick: () => dispatch(openDefaultPopup(true)),
    }], [])


    return <>
        <OptionSelector<Metric, string>
            className='ComparisonGraph_MetricSelector'
            displayExpr='displayName'
            valueExpr='name'
            groupExpr='group'
            sortExpr='displayName'
            fetchDataSource={context.fetchMetrics}
            valueSelector={metricSelector}
            defaultValueSelector={defaultValueSelector}
            onValueChange={changeMetric}
            onValueChangeEx={onValueChangeEx}
            label='Metric'
            opened={state.defaultPopupOpened}
            paginate={false}
            onPopupShowing={onPopupShowing}
            onPopupHiding={onHiding}
            customButtons={favoriteMetrics.length ? customButtons : undefined}
        />
        {state.popupProps ? <MetricsPopup {...state.popupProps} /> : null}
    </>
}

export function metricOrDefault(value: Undefinable<string>): string {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
