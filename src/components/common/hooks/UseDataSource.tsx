import React, { useState, useEffect } from 'react'
import FetchResult from '../../common/Interfaces'

export default function useDataSource<dataSourceT>(fetchDataSource: () => Promise<FetchResult<Array<dataSourceT>>>) {
    const [dataSource, setDataSource] = useState<Array<dataSourceT>>([])
    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<dataSourceT>> = await fetchDataSource()
            if (fetchResult.success) {
                setDataSource(fetchResult.data)
            }
        })()
    }, [])

    return dataSource
}
