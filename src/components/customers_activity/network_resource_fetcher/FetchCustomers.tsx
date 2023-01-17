import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { anyValueIsEmpty } from '../store/Utils'


export interface Customer {
    id: string
    name: string
}


export async function fetchCustomers(
    filterValues: Array<string>,
    searchValue: string | null | undefined,
    skip: number | undefined,
    take: number | undefined
): Promise<FetchResult<Array<Customer>>> {
    if (filterValues.length === 0 && anyValueIsEmpty(searchValue, skip, take)) {
        return {
            success: true,
            data: Array<Customer>()
        }
    }
    try {
        const values = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_customers?` +
            `search=${validateValue(searchValue, '')}` +
            `&skip=${validateValue(skip, 0)}` +
            `&take=${validateValue(take, 0)}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filter_values: filterValues }),
            },
        ).then(response => response.json())
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

function validateValue(value: any, default_value: string | number): string | number {
    if (value === undefined || value === null)
        return default_value
    return value.toString()
}
