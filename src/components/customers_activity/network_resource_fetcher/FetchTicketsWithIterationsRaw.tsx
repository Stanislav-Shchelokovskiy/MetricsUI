import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { Set, getAliasedSet } from '../store/SetsReducer'


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


export const EMPTY_TICKETS_WITH_ITERATIONS_RAW = {
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


export async function fetchTicketsWithIterationsRaw(
    rangeStart: string,
    rangeEnd: string,
    baselineAlignedModeEnabled: boolean,
    isTicketsMetricSelected: boolean,
    set: Set,
): Promise<FetchResult<Array<TicketsWithIterationsRaw>>> {
    try {
        const raw_data: Array<TicketsWithIterationsRaw> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_raw?` +
            `&range_start=${rangeStart}` +
            `&range_end=${rangeEnd}` +
            `&baseline_aligned_mode_enabled=${baselineAlignedModeEnabled}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...getAliasedSet(set),
                    Percentile: { metric: (isTicketsMetricSelected ? 'tickets' : 'iterations'), value: set.percentile }
                }),
            },
        ).then(response => response.json())
        return {
            success: true,
            data: raw_data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: [EMPTY_TICKETS_WITH_ITERATIONS_RAW]
        }
    }
}
