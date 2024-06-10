import { CONVERSION_END_POINT } from '../../EndPoint'
import FetchResult from '../../Typing'
import { fetchArray } from '../FetchOrDefault'

export async function crmidsToSCIDS(values: Array<string> | undefined): Promise<FetchResult<Array<string>>> {
    return fetchConvert('EmployeesCrmids', values)
}

export async function positionsNamesToIDS(values: Array<string> | undefined): Promise<FetchResult<Array<string>>> {
    return fetchConvert('PositionNames', values)
}

export async function tentNamesToIDs(values: Array<string> | undefined): Promise<FetchResult<Array<string>>> {
    return fetchConvert('TentNames', values)
}

export async function tribeNamesToIDs(values: Array<string> | undefined): Promise<FetchResult<Array<string>>> {
    return fetchConvert('TribeNames', values)
}

async function fetchConvert<T>(uri: string, values: Array<T> | undefined): Promise<FetchResult<Array<T>>> {
    if (values === undefined || values.length === 0) {
        return {
            success: true,
            data: []
        }
    }
    return fetchArray(
        `${CONVERSION_END_POINT}/${uri}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ values: values }),
        }
    )
}
