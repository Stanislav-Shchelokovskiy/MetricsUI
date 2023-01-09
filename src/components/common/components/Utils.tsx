export function validateValues<DataSourceT, ValueExprT>(
    dataSource: Array<DataSourceT>,
    values: Array<ValueExprT>,
    valueExpr: string | undefined = undefined
): [Array<ValueExprT>, boolean] {
    const invalidValues = []
    const validValues = []
    const keySelector = valueExpr === undefined ?
        (x: DataSourceT) => (x as unknown) as ValueExprT :
        (x: DataSourceT) => (x[valueExpr as keyof DataSourceT] as unknown) as ValueExprT
    for (const item of values) {
        if (dataSource.find(x => keySelector(x) === item) === undefined) {
            invalidValues.push(item)
            continue
        }
        validValues.push(item)
    }
    if (invalidValues.length === 0)
        return [values, true]
    return [validValues, false]
}
