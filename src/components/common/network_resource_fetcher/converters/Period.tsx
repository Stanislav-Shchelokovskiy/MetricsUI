interface PeriodRaw {
    start: string
    end: string
}

export type Period = [string, string]

export function converter(value: Array<PeriodRaw> | undefined): Period {
    if (value && value.length > 0) {
        const period = value[0]
        return [period.start, period.end]
    }
    return ['', '']
}
