import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { nodeIsEmpty } from '../../store/Utils'
import { FilterParametersNode } from '../../store/SetsReducer'


export interface Severity {
    id: string
    name: string
}


export async function fetchSeverityValues(ticketTypes: FilterParametersNode<number>): Promise<FetchResult<Array<Severity>>> {
    if (nodeIsEmpty(ticketTypes, 2))
        return {
            success: true,
            data: Array<Severity>()
        }

    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_severity_values`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Severity>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Severity>()
        }
    }
}
