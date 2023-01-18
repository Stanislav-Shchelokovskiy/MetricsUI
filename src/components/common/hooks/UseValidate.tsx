import React, { useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import FetchResult, { ValidationResult } from '../Interfaces'
import { PayloadAction } from '@reduxjs/toolkit'


export interface ValidateProps {
    fetchValidValues: ((...args: any) => Promise<FetchResult<Array<ValidationResult>>>),
    fetchValidValuesArgs: Array<any>
}

export function useValidate<DataSourceT, ValueExprT>(
    valuesToValidate: Array<ValueExprT> | undefined,
    dispatchValidValuesAction: (allValidValues: Array<DataSourceT>, validValues: Array<ValueExprT>) => PayloadAction<any>,
    valueExpr: string | undefined = undefined
): (availableValues: Array<DataSourceT> | Array<keyof DataSourceT>, dataSource: Array<DataSourceT> | undefined) => void {
    const dispatch = useDispatch()
    const emptyArray = useMemo(() => [], [])
    const validateSelectedValues = useCallback((
        allValidValues: Array<DataSourceT> | Array<keyof DataSourceT>,
        dataSource: Array<DataSourceT> | undefined = undefined) => {
        if (valuesToValidate === undefined)
            return
        const [validValues, valuesAreValid] = validateValues(allValidValues, valuesToValidate, valueExpr)
        if (valuesAreValid)
            return
        dispatch(dispatchValidValuesAction(dataSource === undefined ? emptyArray : dataSource, validValues))
    }, [valuesToValidate])
    return validateSelectedValues
}


export default function useServerValidate<ValueExprT>(
    fetchValidValues: ((...args: any[]) => Promise<FetchResult<Array<ValidationResult>>>),
    fetchValidValuesArgs: Array<any>,
    valuesToValidate: Array<ValueExprT> | undefined,
    dispatchValidValuesAction: (allValues: Array<any>, validValues: Array<ValueExprT>) => PayloadAction<any>,
) {
    const validateSelectedValues = useValidate<ValueExprT, ValueExprT>(valuesToValidate, dispatchValidValuesAction, undefined)
    useEffect(() => {
        if (fetchValidValues !== undefined) {
            (async () => {
                const fetchResult: FetchResult<Array<ValidationResult>> = await fetchValidValues(...fetchValidValuesArgs)
                if (fetchResult.success) {
                    validateSelectedValues(fetchResult.data.filter(x => x.valid).map(x => x.value), undefined)
                }
            })()
        }
    }, [])//[...fetchValidValuesArgs])
}

export function validateValues<DataSourceT, ValueExprT>(
    dataSource: Array<DataSourceT> | Array<keyof DataSourceT>,
    values: Array<ValueExprT>,
    valueExpr: string | undefined = undefined
): [Array<ValueExprT>, boolean] {
    const invalidValues = []
    const validValues = []
    const keySelector = valueExpr === undefined ?
        (x: keyof DataSourceT) => (x as unknown) as ValueExprT :
        (x: DataSourceT) => (x[valueExpr as keyof DataSourceT] as unknown) as ValueExprT
    for (const item of values) {
        if ((dataSource as Array<any>).find(x => keySelector(x) === item) === undefined) {
            invalidValues.push(item)
            continue
        }
        validValues.push(item)
    }
    if (invalidValues.length === 0)
        return [values, true]
    return [validValues, false]
}
