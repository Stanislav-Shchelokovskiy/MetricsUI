import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'

export interface CustomersGroup{
    id: string
    name: string
}

export const fetchCustomersGroups: () => Promise<FetchResult<Array<CustomersGroup>>> = async function () {
    try {
        const tribes = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_customers_groups`).then(response => response.json())
        return {
            success: true,
            data: (tribes as Array<CustomersGroup>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<CustomersGroup>()
        }
    }
}
