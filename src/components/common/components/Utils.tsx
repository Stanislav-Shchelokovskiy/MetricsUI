export function dependenciesAreEmpty(...deps: Array<any>): boolean {
    for (const dependency of deps) {
        if (dependency.length === 0)
            return true
    }
    return false
}
