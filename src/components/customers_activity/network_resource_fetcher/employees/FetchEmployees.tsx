import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../store/SetsReducer'


export interface Employee {
    crmid: string
    name: string
}


export async function fetchEmployees(
    positions: FilterParametersNode<string>,
    tribes: FilterParametersNode<string>
): Promise<FetchResult<Array<Employee>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_employees`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    positions: positions,
                    tribes: tribes,
                }),
            }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Employee>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Employee>()
        }
    }
}
