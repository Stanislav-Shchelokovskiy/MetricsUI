import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { nodeIsEmpty } from '../../store/Utils'
import { FilterParametersNode } from '../../store/SetsReducer'


export interface TicketStatus {
    id: string
    name: string
}


export async function fetchTicketStatuses(ticketTypes: FilterParametersNode<number>): Promise<FetchResult<Array<TicketStatus>>> {
    if (nodeIsEmpty(ticketTypes, 2))
        return {
            success: true,
            data: Array<TicketStatus>()
        }

    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_ticket_statuses`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<TicketStatus>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<TicketStatus>()
        }
    }
}
