import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface TicketsType {
    id: number
    name: string
}


export const fetchTicketsTypes: () => Promise<FetchResult<Array<TicketsType>>> = async function () {
    try {
        const tribes = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_tickets_types`).then(response => response.json())
        return {
            success: true,
            data: (tribes as Array<TicketsType>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<TicketsType>()
        }
    }
}
