import React, { useCallback } from 'react'
import BugsSelectorWrapper from './BugsSelectors'
import BetweenPeriodSelectorWrapper from './BetweenPeriodSelector'
import { fetchPeriod } from '../../../../network_resource_fetcher/FetchPeriod'
import { changeFixedBetween, changeFixedBetweenInclude } from '../../../../store/actions/Bugs'
import { Set } from '../../../../store/sets_reducer/Interfaces'


export default function FixedBetweenSelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => x?.fixedBetween, [])
    return <BugsSelectorWrapper
        Wrapped={BetweenPeriodSelectorWrapper}
        setTitle={setTitle}
        className='CustomersActivity_FixedBetweenSelector'
        label='Fixed'
        fetchDataSource={fetchPeriod}
        valueSelector={valueSelector}
        changeSelection={changeFixedBetween}
        changeInclude={changeFixedBetweenInclude}
    />
}
