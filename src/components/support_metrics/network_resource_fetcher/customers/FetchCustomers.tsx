import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { anyValueIsEmpty } from '../../../common/store/multiset_container/Utils'
import { ValidationResult } from '../../../common/Typing'

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
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/Customers?` +
        `search=${validateValue(searchValue, '')}` +
        `&skip=${validateValue(skip, 0)}` +
        `&take=${validateValue(take, 0)}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customers: filterValues }),
        }
    )
}

export async function fetchValidateCustomers(customers: Array<string> | undefined): Promise<FetchResult<Array<ValidationResult>>> {
    if (customers === undefined || customers.length === 0) {
        return {
            success: true,
            data: Array<ValidationResult>()
        }
    }
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/ValidateCustomers`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customers: customers }),
        }
    )
}

function validateValue(value: any, defaultValue: string | number): string | number {
    if (value)
        return value.toString()
    return defaultValue
}
