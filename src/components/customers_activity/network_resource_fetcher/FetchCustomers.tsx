import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Customer {
    id: string
    name: string
}


export async function fetchCustomers(): Promise<FetchResult<Array<Customer>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_customers`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Customer>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Customer>()
        }
    }
}
