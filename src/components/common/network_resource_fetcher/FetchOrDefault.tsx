import FetchResult from '../Typing'

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
    responseSelector: ((r: Response) => Promise<any>) = async (r: Response) => await r.json()
): Promise<FetchResult<ResT>> {
    try {
        const res = await fetch(input, {
            ...init,
            credentials: 'include',
        })
        return getFetchResult(true, converter(await responseSelector(res)))
    } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError'))
            console.log(error)
        return getFetchResult(false, converter(undefined))
    }
}

export function getFetchResult<T>(success: boolean, data: T): FetchResult<T> {
    return {
        success: success,
        data: data
    }
}
