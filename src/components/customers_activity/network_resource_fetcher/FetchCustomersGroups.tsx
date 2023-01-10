import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface CustomersGroup {
    id: string
    name: string
}


export async function fetchCustomersGroups(tracked: boolean): Promise<FetchResult<Array<CustomersGroup>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_customers_groups?` + new URLSearchParams({
            tracked: tracked.toString()
        })).then(response => response.json())
        return {
            success: true,
            data: (values as Array<CustomersGroup>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<CustomersGroup>()
        }
    }
}
