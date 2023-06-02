import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets_reducer/Interfaces'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
import { isTicketsMetricSelected } from './FetchMetrics'
import { BaseAgg } from '../../common/components/multiset_container/graph/ComparisonGraph'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'

interface TicketsWithIterationsAggregate {
    period: string
    tickets: number
    iterations: number
    iterations_to_tickets: number
    people: number
}

export interface TicketsWithIterationsAggregates extends BaseAgg {
    tickets: Array<number>
    iterations: Array<number>
    iterations_to_tickets: Array<number>
    people: Array<number>
}

const EMPTY_AGGREGATES = {
    periods: [],
    tickets: [],
    iterations: [],
    iterations_to_tickets: [],
    people: [],
    customdata: [],
}

function aggregatesConverter(aggregates: Array<TicketsWithIterationsAggregate> | undefined) {

    if (aggregates) {
        const periods = []
        const tickets = []
        const iterations = []
        const iterations_to_tickets = []
        const people = []
        const agg_names = []
        for (const agg of aggregates) {
            periods.push(agg.period)
            tickets.push(agg.tickets)
            iterations.push(agg.iterations)
            iterations_to_tickets.push(agg.iterations / agg.tickets)
            people.push(agg.people)
            agg_names.push('')
        }
        return {
            periods: periods,
            tickets: tickets,
            iterations: iterations,
            iterations_to_tickets: iterations_to_tickets,
            people: people,
            customdata: agg_names,
        }
    }
    return EMPTY_AGGREGATES
}

function getConverter(setTitle: string) {
    return (aggregates: Array<TicketsWithIterationsAggregate> | undefined): TicketsWithIterationsAggregates => {
        return {
            name: setTitle,
            ...aggregatesConverter(aggregates),
        }
    }
}

export async function fetchTicketsWithIterationsAggregates(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<TicketsWithIterationsAggregates>> {
    const [rangeStart, rangeEnd] = containerState.range

    if (anyValueIsEmpty(rangeStart, rangeEnd, containerState.groupByPeriod, containerState.metric))
        return {
            success: false,
            data: {
                name: '',
                ...EMPTY_AGGREGATES,
            }
        }

    return fetchConvert(getConverter(set.title),
        `${SUPPORT_ANALYTICS_END_POINT}/TicketsWithIterationsAggregates?` +
        `group_by_period=${containerState.groupByPeriod}` +
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
        })
}
