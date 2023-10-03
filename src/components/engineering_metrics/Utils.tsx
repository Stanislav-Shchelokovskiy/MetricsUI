import { supportMetricsContext } from '../support_metrics/SupportMetricsContainer'
import { costMetricsContext } from '../cost_metrics/CostMetricsContainer'
import { performanceMetricsContext } from '../performance_metrics/PerformanceMetricsContainer'
import {
    isSupportContextSelected,
    isCostContextSelected,
    isPerformanceContextSelected,
    Context
} from '../common/store/multiset_container/Context'

export function getContext(ctx: Context) {
    if (isSupportContextSelected(ctx))
        return supportMetricsContext

    if (isCostContextSelected(ctx))
        return costMetricsContext

    if (isPerformanceContextSelected(ctx))
        return performanceMetricsContext

    throw new Error(`Context for context #${ctx} is missing.`)
}
