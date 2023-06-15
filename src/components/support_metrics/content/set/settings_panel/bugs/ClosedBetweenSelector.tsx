import React from 'react'
import { ClosedBugsSelectorWrapper } from './BugsSelectors'
import BetweenPeriodSelectorWrapper from './BetweenPeriodSelector'
import { fetchPeriod } from '../../../../network_resource_fetcher/FetchPeriod'
import { changeClosedBetween, changeClosedBetweenInclude } from '../../../../store/actions/Bugs'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { closedBetweenSelector } from '../../../../store/sets_reducer/Selectors'


export default function ClosedBetweenSelector() {
    const setTitle = useSetTitle()
    return <ClosedBugsSelectorWrapper
        Wrapped={BetweenPeriodSelectorWrapper}
        setTitle={setTitle}
        className='CustomersActivity_ClosedBetweenSelector'
        label='Bugs closed'
        fetchDataSource={fetchPeriod}
        valueSelector={closedBetweenSelector}
        changeSelection={changeClosedBetween}
        changeInclude={changeClosedBetweenInclude}
    />
}
