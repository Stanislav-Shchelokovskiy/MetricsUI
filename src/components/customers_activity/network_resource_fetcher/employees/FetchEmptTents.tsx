import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'

export interface EmpTent {
    id: string
    name: string
}

export async function fetchEmpTents(): Promise<FetchResult<Array<EmpTent>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_emp_tents`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<EmpTent>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<EmpTent>()
        }
    }
}
