import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface TicketsTag {
    id: number
    name: string
}


export const fetchTicketsTags: () => Promise<FetchResult<Array<TicketsTag>>> = async function () {
    try {
        const tribes = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_tickets_tags`).then(response => response.json())
        return {
            success: true,
            data: (tribes as Array<TicketsTag>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<TicketsTag>()
        }
    }
}
