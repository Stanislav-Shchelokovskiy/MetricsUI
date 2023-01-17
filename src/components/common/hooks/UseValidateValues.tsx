import React, { useEffect } from 'react'
import FetchResult from '../Interfaces'


export interface ValidateProps {
    fetchValidValues: ((...args: any) => Promise<FetchResult<Array<ValidationResult>>>),
    fetchValidValuesArgs: Array<any>
}

export interface ValidationResult {
    value: any
    valid: boolean
}


export default function useValidateValues<T>(
    fetchValidValues: ((...args: any[]) => Promise<FetchResult<Array<ValidationResult>>>),
    fetchValidValuesArgs: Array<any>,
    onValidValuesFetch: (values: Array<T>) => void
) {
    useEffect(() => {
        if (fetchValidValues !== undefined) {
            (async () => {
                const fetchResult: FetchResult<Array<ValidationResult>> = await fetchValidValues(...fetchValidValuesArgs)
                if (fetchResult.success) {
                    console.log(fetchResult.data)
                    onValidValuesFetch(fetchResult.data.filter(x => x.valid).map(x => x.value))
                }
            })()
        }
    }, [...fetchValidValuesArgs])
}
