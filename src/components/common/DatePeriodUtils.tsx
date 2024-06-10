import { resourceUsage } from "process"

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

export type PeriodStr = Array<string>
export type PeriodContainer = { values: PeriodStr | undefined }

export function periodOrDefault(value: PeriodStr | undefined) {
    if (value) {
        if (value.length > 2)
            return [value[0], value[1]]
        return value
    }
    return ['', '']
}

export function getPeriod(val: PeriodContainer | PeriodStr | undefined): PeriodStr {
    return (Array.isArray(val) ? val : (val && 'values' in val ? (val as PeriodContainer).values : undefined)) || []
}

export function validatePeriod(validPeriod: PeriodStr, newPeriod: PeriodStr, _: any = undefined): [PeriodStr, boolean] {
    /**
     * Validates new period against valid period.
     * Returns valid period and flag indicating if new period was valid.
    */
    if (newPeriod.length == 2) {
        const [newPeriodStartStr, newPeriodEndStr] = newPeriod
        if (validPeriod.length == 2) {
            const newPeriodStart = new Date(newPeriodStartStr)
            const newPeriodEnd = new Date(newPeriodEndStr)

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
    if (validPeriod.length == 2)
        return [validPeriod, false]
    return [[], false]
}
