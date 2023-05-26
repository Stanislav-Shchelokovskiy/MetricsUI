import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { SetState } from '../store/sets_reducer/Interfaces'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
import { ContainerState } from '../store/ContainerReducer'
import { isTicketsMetricSelected } from '../../common/components/multiset_container/graph/MetricSelector'

export interface TicketsWithIterationsRaw {
    user_id: string
    tribe_id: string
    scid: string
    ticket_type: number
    creation_date: string
    iterations: number
    reply: string
    component: string
    feature: string
}

const EMPTY_TICKETS_WITH_ITERATIONS_RAW = {
    user_id: '',
    tribe_id: '',
    scid: '',
    ticket_type: 0,
    creation_date: '',
    iterations: 0,
    reply: '',
    component: '',
    feature: '',
}

interface TicketsWithIterationsRawSet {
    index: number
    raw_data: Array<TicketsWithIterationsRaw>
}

const EMPTY_TICKETS_WITH_ITERATIONS_RAW_SET = {
    index: 0,
    raw_data: [EMPTY_TICKETS_WITH_ITERATIONS_RAW]
}

export async function fetchTicketsWithIterationsRaw(
    containerState: ContainerState,
    set: SetState,
    index: number,
): Promise<FetchResult<TicketsWithIterationsRawSet>> {
    try {
        const [rangeStart, rangeEnd] = containerState.range
        const raw_data: Array<TicketsWithIterationsRaw> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_raw?` +
            `&range_start=${rangeStart}` +
            `&range_end=${rangeEnd}` +
            `&baseline_aligned_mode_enabled=${containerState.baselineAlignedModeEnabled}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...getAliasedSet(set),
                    Percentile: { metric: (isTicketsMetricSelected(containerState.metric) ? 'tickets' : 'iterations'), value: set.percentile }
                }),
            },
        ).then(response => response.json())
        return {
            success: true,
            data: {
                index: index,
                raw_data: raw_data,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: EMPTY_TICKETS_WITH_ITERATIONS_RAW_SET
        }
    }
}
