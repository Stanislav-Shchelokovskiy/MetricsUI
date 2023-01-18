import React, { useState, useEffect } from 'react'
import FetchResult from '../../common/Interfaces'


export interface DataSourceProps<DataSourceT> {
    dataSource: Array<DataSourceT>
    fetchDataSource: ((...args: any) => Promise<FetchResult<Array<DataSourceT>>>) | undefined
    fetchArgs: Array<any>
}


export default function useDataSource<DataSourceT>(
    dataSource: Array<DataSourceT>,
    fetchDataSource: ((...args: any[]) => Promise<FetchResult<Array<DataSourceT>>>) | undefined,
    fetchArgs: Array<any>,
    onDataSourceFetch?: (allValidValues: Array<DataSourceT> | Array<keyof DataSourceT>, dataSource: Array<DataSourceT>) => void
) {
    const [ds, setDataSource] = useState<Array<DataSourceT>>(dataSource)
    useEffect(() => {
        if (fetchDataSource !== undefined) {
            (async () => {
                const fetchResult: FetchResult<Array<DataSourceT>> = await fetchDataSource(...fetchArgs)
                if (fetchResult.success) {
                    const ds = fetchResult.data
                    setDataSource(ds)
                    onDataSourceFetch?.(ds, ds)
                }
            })()
        }
    }, [...fetchArgs])
    return ds
}
