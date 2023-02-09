import React, { useMemo } from 'react'
import OptionSelector from '../../../../../common/components/OptionSelector'
import { changePrivacy } from '../../../../store/actions/Tickets'
import { CustomersActivityStore } from '../../../../store/Store'


interface Privacy {
    id: number
    name: string
}


export default function PrivacySelector({ setTitle }: { setTitle: string }) {
    const ds = useMemo(() => [{ id: 1, name: 'Private tickets only' }, { id: 0, name: 'Public tickets only' }], [])
    const valueSelector = (store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.privacy?.value
    const onValueChange = (value: number | undefined) => changePrivacy({ stateId: setTitle, data: value === null ? undefined : value })

    return <OptionSelector<Privacy, number | undefined>
        className='CustomersActivity_PrivacySelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Public and private tickets'
        dataSource={ds}
        valueSelector={valueSelector}
        onValueChange={onValueChange}
        label=''
        showDropDownButton={false}
        showClearButton={true}
    />
} 
