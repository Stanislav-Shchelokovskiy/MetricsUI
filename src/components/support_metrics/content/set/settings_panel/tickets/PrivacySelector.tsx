import React, { useMemo } from 'react'
import OptionSelector from '../../../../../common/components/OptionSelector'
import { changePrivacy } from '../../../../store/actions/Tickets'
import { SupportMetricsStore } from '../../../../store/Store'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { privacySelector } from '../../../../store/sets/Selectors'

interface Privacy {
    id: number
    name: string
}

export default function PrivacySelector() {
    const setTitle = useSetTitle()
    const ds = useMemo(() => [{ id: 1, name: 'Private' }, { id: 0, name: 'Public' }], [])
    const valueSelector = (store: SupportMetricsStore) => privacySelector(store, setTitle)?.value
    const onValueChange = (value: number | undefined) => changePrivacy({ stateId: setTitle, data: value === null ? undefined : value })

    return <OptionSelector<Privacy, number | undefined>
        displayExpr='name'
        valueExpr='id'
        placeholder='Public or private'
        dataSource={ds}
        valueSelector={valueSelector}
        onValueChange={onValueChange}
        label='Ticket visibility'
        showDropDownButton={false}
        showClear={true}
    />
} 
