import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import FetchResult, { ValidationResult } from '../Interfaces'
import { PayloadAction } from '@reduxjs/toolkit'


export interface ValidateProps {
    fetchValidValues: ((...args: any) => Promise<FetchResult<Array<ValidationResult>>>),
    fetchValidValuesArgs: Array<any>
}

export function useValidate<DataSourceT, ValueExprT>(
    valuesToValidate: Array<ValueExprT> | undefined,
    dispatchValidValuesAction: (allValues: Array<DataSourceT>, validValues: Array<ValueExprT>) => PayloadAction<any>,
    valueExpr: string | undefined = undefined
): (availableValues: Array<DataSourceT>) => void {
    const dispatch = useDispatch()
    const validateSelectedValues = useCallback((availableValues: Array<DataSourceT>) => {
        if (valuesToValidate === undefined)
            return
        const [validValues, valuesAreValid] = validateValues(availableValues, valuesToValidate, valueExpr)
        if (valuesAreValid)
            return
        dispatch(dispatchValidValuesAction(valueExpr ? availableValues : [], validValues))
    }, [valuesToValidate, valueExpr, dispatchValidValuesAction, dispatch])
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
                    validateSelectedValues(fetchResult.data.filter(x => x.valid).map(x => x.value))
                }
            })()
        }
    }, [...fetchValidValuesArgs, validateSelectedValues])
}

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
