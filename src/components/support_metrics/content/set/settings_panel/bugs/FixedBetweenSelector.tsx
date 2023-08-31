import React from 'react'
import BugsSelectorWrapper from './BugsSelectors'
import BetweenPeriodSelectorWrapper from './BetweenPeriodSelector'
import { fetchPeriod } from '../../../../network_resource_fetcher/Period'
import { changeFixedBetween, changeFixedBetweenInclude } from '../../../../store/actions/Bugs'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { fixedBetweenSelector } from '../../../../store/sets/Selectors'


export default function FixedBetweenSelector() {
    const setTitle = useSetTitle()
    return <BugsSelectorWrapper
        Wrapped={BetweenPeriodSelectorWrapper}
        setTitle={setTitle}
        className='CustomersActivity_FixedBetweenSelector'
        label='Fixed'
        fetchDataSource={fetchPeriod}
        valueSelector={fixedBetweenSelector}
        changeSelection={changeFixedBetween}
        changeInclude={changeFixedBetweenInclude}
    />
}
