import { Set, FilterParametersNode } from './Interfaces'

export function updateSetState<T extends Set>(title: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.title === title ? replaceState(x) : x })
}

export function updateValues<T>(obj: FilterParametersNode<T> | undefined, values: Array<T> | undefined): FilterParametersNode<T> | undefined {
    if (!obj) {
        if (values && values.length > 0)
            return {
                include: true,
                values: values
            }
        return undefined
    }
    if (obj.include && (!values || values.length === 0))
        return undefined
    return {
        ...obj,
        values: values || []
    }
}

export function updateInclude<T>(obj: FilterParametersNode<T> | undefined, include: boolean): FilterParametersNode<T> | undefined {
    if (!obj) {
        if (!include)
            return {
                include: include,
                values: Array<T>()
            }
        return obj
    }
    if (include && obj.values.length === 0)
        return undefined
    return {
        ...obj,
        include: include
    }
}
