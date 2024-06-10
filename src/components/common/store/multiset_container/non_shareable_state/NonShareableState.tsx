export interface NonShareableState {
    favoriteMetrics: Array<string>
}

export const INITIAL_STATE = { favoriteMetrics: [] }

export function nameOf(prop: keyof NonShareableState): string {
    return prop.toString()
}
