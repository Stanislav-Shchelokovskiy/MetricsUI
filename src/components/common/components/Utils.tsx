export function anyDependencyIsEmpty(...deps: Array<any>): boolean {
    for (const dependency of deps) {
        if (dependency.length === 0)
            return true
    }
    return false
}

export function allDependenciesAreEmpty(...deps: Array<any>): boolean {
    for (const dependency of deps) {
        if (dependency.length !== 0)
            return false
    }
    return true
}
