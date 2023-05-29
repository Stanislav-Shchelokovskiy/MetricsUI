import FetchResult from '../Interfaces'

export async function fetchArray<T>(input: RequestInfo | URL, init?: RequestInit): Promise<FetchResult<Array<T>>> {
    return fetchConvert<Array<T>, Array<T>>(fetchArrayConverter, input, init)
}

function fetchArrayConverter<T>(values: Array<T> | undefined): Array<T> {
    return values ? values : Array<T>()
}

export async function fetchConvert<RawT, ResT>(
    converter: (value: RawT | undefined) => ResT,
    input: RequestInfo | URL,
    init?: RequestInit,
    responseSelector: ((r: Response) => any) = (r: Response) => r.json()
): Promise<FetchResult<ResT>> {
    try {
        const res = await fetch(input, init).then(response => responseSelector(response))
        return getFetchResult(true, converter(res))
    } catch (error) {
        console.log(error)
        return getFetchResult(false, converter(undefined))
    }
}

function getFetchResult<T>(success: boolean, data: T): FetchResult<T> {
    return {
        success: success,
        data: data
    }
}
