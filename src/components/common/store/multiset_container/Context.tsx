export enum Context {
    Support = 0,
    Cost = 1,
    Performance = 2,
}

export function isSupportContextSelected(ctx: Context) {
    return ctx === Context.Support
}

export function isCostContextSelected(ctx: Context) {
    return ctx === Context.Cost
}

export function contextOrDefault(ctx: Context | undefined): Context {
    if (ctx !== undefined)
        return ctx
    return Context.Support
}
