import React, { useCallback } from 'react'
import BugsSelectorWrapper from './BugsSelectors'
import BetweenPeriodSelectorWrapper from './BetweenPeriodSelector'
import { fetchPeriod } from '../../../../network_resource_fetcher/FetchPeriod'
import { changeFixedBetween, changeFixedBetweenInclude } from '../../../../store/actions/Bugs'
import { SetState } from '../../../../store/sets_reducer/Interfaces'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'


export default function FixedBetweenSelector() {
    const setTitle = useSetTitle()
    const valueSelector = useCallback((x: SetState | undefined) => x?.fixedBetween, [])
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
