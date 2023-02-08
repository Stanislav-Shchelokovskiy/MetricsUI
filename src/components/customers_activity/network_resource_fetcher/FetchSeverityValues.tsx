import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Severity {
    id: string
    name: string
}


export async function fetchSeverityValues(): Promise<FetchResult<Array<Severity>>> {
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
