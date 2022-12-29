import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface EmpTribe {
    id: string
    name: string
}


export const fetchEmpTribes: () => Promise<FetchResult<Array<EmpTribe>>> = async function () {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_emp_tribes`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<EmpTribe>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<EmpTribe>()
        }
    }
}
