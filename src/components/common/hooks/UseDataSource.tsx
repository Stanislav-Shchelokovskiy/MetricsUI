import React, { useState, useEffect } from 'react'
import FetchResult from '../../common/Interfaces'

export default function useDataSource<DataSourceT>(fetchDataSource: () => Promise<FetchResult<Array<DataSourceT>>>) {
    const [dataSource, setDataSource] = useState<Array<DataSourceT>>([])
    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<DataSourceT>> = await fetchDataSource()
            if (fetchResult.success) {
                setDataSource(fetchResult.data)
            }
        })()
    }, [])

    return dataSource
}
