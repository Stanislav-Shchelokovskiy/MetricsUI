import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { SetState } from '../store/SetsReducer'


type DisplayFilter = Array<any>



export async function fetchDisplayFilter(
    isTicketsMetricSelected: boolean,
    set: SetState,
): Promise<FetchResult<DisplayFilter>> {
    try {
        const filters: Array<DisplayFilter> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_customers_activity_display_filter`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Percentile: { metric: (isTicketsMetricSelected ? 'tickets' : 'iterations'), value: set.percentile },
                    Tribes: set.tribes,
                    Platforms: set.platforms,
                    Products: set.products,
                    'Ticket tags': set.ticketsTags,
                    'Ticket types': set.ticketsTypes,
                    'User groups': set.customersGroups,
                    'User types': set.customersTypes,
                    'User conversion types': set.conversionsTypes,
                    'Employees positions': set.positions,
                    'Employees tribes': set.empTribes,
                    'Employees': set.employees,
                    'CAT replies types': set.repliesTypes,
                    'CAT components': set.components,
                    'CAT features': set.features,
                    'Customers': set.customers,
                }),
            },
        ).then(response => response.json())

        return {
            success: true,
            data: filters
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: []
        }
    }
}
