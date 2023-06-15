import React, { useCallback, PropsWithChildren, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeContext as chngCtx } from '../common/store/multiset_container/Actions'
import { Context } from './store/ContainerReducer'
import { contextSelector } from './store/Selectors'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import SupportMetrics, { supportMetricsContext } from '../support_metrics/SupportMetricsContainer'
import CostMetrics, { costMetricsContext } from '../cost_metrics/CostMetricsContainer'
import { fetchMetrics } from './fetchMetrics'


export function EngineeringMetricsApplySharedState() {
    return <ApplySharedState />
}

function getContext(ctx: Context) {
    if (ctx === Context.Support)
        return supportMetricsContext
    return costMetricsContext
}

export default function EngineeringMetrics() {
    const dispatch = useDispatch()
    const changeContext = useCallback((ctx: Context) => {
        dispatch(chngCtx(ctx))
    }, [])

    const ctx = useSelector(contextSelector)
    const context = useMemo(() => {
        return {
            ...getContext(ctx),
            changeContext: changeContext,
            fetchMetrics: fetchMetrics
        }
    }, [ctx])

    return <MultisetContainerContext.Provider value={context}>
        {ctx === Context.Support ? <SupportMetrics /> : <CostMetrics />}
    </MultisetContainerContext.Provider>
}
