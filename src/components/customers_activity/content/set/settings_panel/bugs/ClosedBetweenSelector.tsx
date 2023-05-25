import React, { useCallback } from 'react'
import { ClosedBugsSelectorWrapper } from './BugsSelectors'
import BetweenPeriodSelectorWrapper from './BetweenPeriodSelector'
import { fetchPeriod } from '../../../../network_resource_fetcher/FetchPeriod'
import { changeClosedBetween, changeClosedBetweenInclude } from '../../../../store/actions/Bugs'
import { SetState } from '../../../../store/sets_reducer/Interfaces'


export default function ClosedBetweenSelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: SetState | undefined) => x?.closedBetween, [])
    return <ClosedBugsSelectorWrapper
        Wrapped={BetweenPeriodSelectorWrapper}
        setTitle={setTitle}
        className='CustomersActivity_ClosedBetweenSelector'
        label='Bugs closed'
        fetchDataSource={fetchPeriod}
        valueSelector={valueSelector}
        changeSelection={changeClosedBetween}
        changeInclude={changeClosedBetweenInclude}
    />
}
