import React, { useState, useEffect } from 'react'
import FetchResult from '../../common/Interfaces'
import { HelpItem } from '../../common/Interfaces'


export interface HelpProps {
    fetchHelp: ((...args: any) => Promise<FetchResult<HelpItem>>) | undefined
    fetchHelpArgs: Array<any>
}


export function useHelp<T = HelpItem | Array<HelpItem>>(
    fetchHelp: ((...args: any) => Promise<FetchResult<T>>) | undefined,
    fetchHelpArgs: Array<any>,
) {
    const [help, setHelp] = useState<T>()
    useEffect(() => {
        if (fetchHelp) {
            (async () => {
                const fetchResult: FetchResult<T> = await fetchHelp(...fetchHelpArgs)
                if (fetchResult.success && (Array.isArray(fetchResult.data) || (fetchResult.data as unknown as HelpItem).title))
                    setHelp(fetchResult.data)
                else
                    setHelp(undefined)
            })()
        }
    }, [...fetchHelpArgs, fetchHelp])

    return help
}
