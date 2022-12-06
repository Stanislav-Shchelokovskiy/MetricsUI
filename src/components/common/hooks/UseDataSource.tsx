import React, { useState, useEffect } from 'react'
import FetchResult from '../../common/Interfaces'

export default function useDataSource<DataSourceT>(fetchDataSource: () => Promise<FetchResult<Array<DataSourceT>>>) {
    return useDS(fetchDataSource, null)
}

export function useCascadeDataSource<DataSourceT>(fetchDataSource: () => Promise<FetchResult<Array<DataSourceT>>>, ...dependency: any[]) {
    return useDS(() => fetchDataSource(), ...dependency)
}

function useDS<DataSourceT>(fetchDataSource: () => Promise<FetchResult<Array<DataSourceT>>>, ...dependency: any) {
    const [dataSource, setDataSource] = useState<Array<DataSourceT>>([])
    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<DataSourceT>> = await fetchDataSource()
            if (fetchResult.success) {
                setDataSource(fetchResult.data)
            }
        })()
    }, [...dependency])
    return dataSource
}
