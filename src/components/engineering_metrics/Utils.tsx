import { Store } from '@reduxjs/toolkit'
import { supportMetricsContext } from '../support_metrics/SupportMetricsContainer'
import { costMetricsContext } from '../cost_metrics/CostMetricsContainer'
import { performanceMetricsContext } from '../performance_metrics/PerformanceMetricsContainer'
import {
    isSupportContextSelected,
    isCostContextSelected,
    isPerformanceContextSelected,
    Context
} from '../common/store/multiset_container/Context'
import { getStore as getCostStore } from '../cost_metrics/store/Store'
import { getStore as getSupportStore } from '../support_metrics/store/Store'
import { getStore as getPerformanceStore } from '../performance_metrics/store/Store'

export function getSubStore(ctx: Context): Store {
    if (isSupportContextSelected(ctx))
        return getSupportStore()

    if (isCostContextSelected(ctx))
        return getCostStore()

    if (isPerformanceContextSelected(ctx))
        return getPerformanceStore()

    throw new Error(`Store for context #${ctx} is missing.`)
}

export function getContext(ctx: Context) {
    if (isSupportContextSelected(ctx))
        return supportMetricsContext

    if (isCostContextSelected(ctx))
        return costMetricsContext

    if (isPerformanceContextSelected(ctx))
        return performanceMetricsContext

    throw new Error(`Context for context #${ctx} is missing.`)
}
