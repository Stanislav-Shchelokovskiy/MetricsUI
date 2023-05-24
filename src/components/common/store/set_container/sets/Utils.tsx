import { FilterParametersNode } from './Interfaces'
import { BaseSet } from './Interfaces'
import { getDefaultFilterParametersNode } from './Defaults'

export function updateSetState<T extends BaseSet>(title: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
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

export function generateSetTitle(existingSetsTitles: Array<string>, newTitleCandidate: string = ''): string {
    if (!existingSetsTitles.length)
        return newTitleCandidate || '0'
    let setsLength = newTitleCandidate ? -1 : existingSetsTitles.length - 1
    let isNotUniqueTitle = false
    let title: string
    do {
        setsLength++
        title = (!isNotUniqueTitle && newTitleCandidate) ? newTitleCandidate : (newTitleCandidate + setsLength)
        isNotUniqueTitle = existingSetsTitles.find(x => x === title) !== undefined
    } while (isNotUniqueTitle)
    return title
}

export function allNodesAreConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T> | undefined>): boolean {
    for (const node of nodes)
        if (!nodeIsEmpty<T>(node))
            return false
    return true
}

export function anyNodeIsConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T> | undefined>): boolean {
    for (const node of nodes)
        if (nodeIsEmpty<T>(node))
            return true
    return false
}

export function nodeIsEmpty<T>(node: FilterParametersNode<T> | undefined, mustHaveValue: T | undefined = undefined) {
    return (
        node === undefined ||
        (node.include && node.values.length === 0) || (
            mustHaveValue !== undefined && (
                (node.include && !node.values.includes(mustHaveValue)) ||
                (!node.include && node.values.includes(mustHaveValue))
            )
        )
    )
}

export function anyValueIsEmpty(...values: Array<any>): boolean {
    for (const value of values)
        if (value === undefined || value === null || value.toString() === '')
            return true
    return false
}

export function paramOrDefault<T>(param: FilterParametersNode<T> | undefined): FilterParametersNode<T> | Array<T> {
    return param || ((getDefaultFilterParametersNode<T>([]) as unknown) as Array<T>)
}
