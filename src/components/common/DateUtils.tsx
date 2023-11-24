export function toDate(isoDate: string | undefined): Date | undefined {
    if (isoDate) {
        const d = new Date(isoDate)
        d.setHours(0, 0, 0, 0)
        return d
    }
    return undefined
}

export function dateToISOstr(date: Date): string {
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - (offset * 60 * 1000)).toISOString().slice(0, 10)
}

export function validatePeriod(validPeriod: Array<string>, newPeriod: Array<string>, _: any = undefined): [Array<string>, boolean] {
    /**
     * Validates new period against valid period.
     * Returns valid period and flag indicating if new period was valid.
    */
    const [newPeriodStartStr, newPeriodEndStr] = newPeriod
    const newPeriodStart = new Date(newPeriodStartStr)
    const newPeriodEnd = new Date(newPeriodEndStr)

    if (validPeriod.length = 2) {
        const [periodStartStr, periodEndStr] = validPeriod
        const periodStart = new Date(periodStartStr)
        const periodEnd = new Date(periodEndStr)

        if (newPeriodStart < newPeriodEnd) {
            if (periodStart <= newPeriodStart && newPeriodEnd <= periodEnd)
                return [[newPeriodStartStr, newPeriodEndStr], true]

            if (newPeriodStart < periodStart && newPeriodEnd <= periodEnd)
                return [[periodStartStr, newPeriodEndStr], false]

            if (periodStart <= newPeriodStart && periodEnd < newPeriodEnd)
                return [[newPeriodStartStr, periodEndStr], false]
        }
        if (isNaN(newPeriodStart.getDate())) {
            if (isNaN(newPeriodEnd.getDate()))
                return [[periodStartStr, periodEndStr], false]
            return [[periodStartStr, newPeriodEndStr], false]
        } else if (isNaN(newPeriodEnd.getDate())) {
            return [[newPeriodStartStr, periodEndStr], false]
        }
        return [[periodStartStr, periodEndStr], false]
    }
    return [[newPeriodStartStr, newPeriodEndStr], true]
}
