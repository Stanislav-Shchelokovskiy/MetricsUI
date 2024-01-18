import React, { useState, useEffect, useRef } from 'react'
import FetchResult from '../Typing'
import { HelpItem, Token } from '../Typing'


export interface HelpProps {
    fetchHelp: ((...args: any) => Promise<FetchResult<HelpItem>>) | undefined
    fetchHelpArgs: Array<any>
}


export function useHelp<T = HelpItem | Array<HelpItem>>(
    fetchHelp: ((...args: any) => Promise<FetchResult<T>>) | undefined,
    fetchHelpArgs: Array<any>,
) {
    const [help, setHelp] = useState<T>()
    const cancellationToken = useRef<Token>({ cancel: () => { } })
    useEffect(() => {
        cancellationToken.current.cancel();
        if (fetchHelp) {
            (async (token: Token) => {
                const controller = new AbortController()
                token.cancel = () => { controller.abort() }
                
                const fetchResult: FetchResult<T> = await fetchHelp(...fetchHelpArgs, controller.signal)
                
                if (controller.signal.aborted)
                    return
                
                if (fetchResult.success && (Array.isArray(fetchResult.data) || (fetchResult.data as unknown as HelpItem).title))
                    setHelp(fetchResult.data)
                else
                    setHelp(undefined)
            })(cancellationToken.current)
        }
    }, [...fetchHelpArgs, fetchHelp])

    return help
}
