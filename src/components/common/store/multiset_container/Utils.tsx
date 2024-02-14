import { FilterParameters, FilterParameter } from './sets/Interfaces'
import { BaseSetState } from './sets/Interfaces'
import { getFilterParameters, getFilterParameter } from './sets/Defaults'

export function updateSetState<T extends BaseSetState>(title: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.title === title ? replaceState(x) : x })
}

export function updateValues<T>(obj: FilterParameters<T> | undefined, values: Array<T> | undefined): FilterParameters<T> | undefined {
    if (!obj) {
        if (values && values.length > 0)
            return getFilterParameters(values)
        return undefined
    }
    if (obj.include && (!values || values.length === 0))
        return undefined
    return {
        ...obj,
        values: values || Array<T>()
    }
}

export function updateValuesInclude<T>(obj: FilterParameters<T> | undefined, include: boolean): FilterParameters<T> | undefined {
    if (!obj) {
        if (!include)
            return {
                include: false,
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

export function updateThreeStateValue(obj: FilterParameter<boolean> | undefined, value: boolean | undefined): FilterParameter<boolean> | undefined {
    if (value === undefined)
        return undefined
    return getFilterParameter(value)
}

export function updateThreeStateValueInclude(obj: FilterParameter<boolean> | undefined, include: boolean, defaultValue: boolean): FilterParameter<boolean> | undefined {
    if (!include)
        return undefined
    return getFilterParameter(obj ? obj.value : defaultValue)
}

export function generateSetTitle(existingSetsTitles: Array<string>, newTitleCandidate: string = ''): string {
    if (!existingSetsTitles.length)
        return newTitleCandidate || toFriendlyTitle('0')
    let setsLength = newTitleCandidate ? -1 : existingSetsTitles.length - 1
    let isNotUniqueTitle = false
    let title: string
    do {
        setsLength++
        title = (!isNotUniqueTitle && newTitleCandidate) ? newTitleCandidate : toFriendlyTitle((newTitleCandidate + setsLength))
        isNotUniqueTitle = existingSetsTitles.find(x => x === title) !== undefined
    } while (isNotUniqueTitle)
    return title
}

export function toFriendlyTitle(title: string) {
    if (isNaN(parseFloat(title)))
        return title
    return `Set ${title}`
}

export function allNodesAreConsideredEmpty<T>(...nodes: Array<FilterParameters<T> | undefined>): boolean {
    for (const node of nodes)
        if (!nodeIsEmpty<T>(node))
            return false
    return true
}

export function anyNodeIsConsideredEmpty<T>(...nodes: Array<FilterParameters<T> | undefined>): boolean {
    for (const node of nodes)
        if (nodeIsEmpty<T>(node))
            return true
    return false
}

export function nodeIsEmpty<T>(node: FilterParameters<T> | undefined, mustHaveValue: T | undefined = undefined) {
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

export const TAKE_FROM_DEFAULT_SELECTOR = '#takeFromValues#'
export function anyValueIsEmpty(...values: Array<any>): boolean {
    for (const value of values)
        if (value === undefined || value === null || value.toString() === '' || value.toString() === TAKE_FROM_DEFAULT_SELECTOR)
            return true
    return false
}

export function paramOrDefault<T>(param: FilterParameters<T> | undefined): FilterParameters<T> {
    return param || getFilterParameters<T>([])
}

export function definedValueOrDefault(val: any, defaultVal: any) {
    return val !== undefined ? val : defaultVal
}

export function valueOrDefault(val: any, defaultVal: any) {
    return val || defaultVal
}
