import FetchResult from '../../common/Interfaces'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
//import { FilterParametersNode } from '../../common/store/set_container/sets/Interfaces'


export interface Employee {
    name: string
    tribe: string
}


export async function fetchEmployees(
    // positions: FilterParametersNode<string>,
    // tribes: FilterParametersNode<string>,
    // tents: FilterParametersNode<string>,
): Promise<FetchResult<Array<Employee>>> {
    try {
        const values = await fetch(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Employees`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({
                //     positions: positions,
                //     tribes: tribes,
                //     tents: tents,
                // }),
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
