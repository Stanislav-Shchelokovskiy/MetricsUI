import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/components/LoadIndicator'
import FetchResult from '../../../../common/Interfaces'
import { useAppDispatch, useAppSelector, AppStore } from '../../../../common/AppStore'
import { changeTicketsTypes } from '../../../store/Actions'
import { fetchTicketsTypes, TicketsType } from '../../../network_resource_fetcher/FetchTicketsTypes'


export default function TicketsTypesSelector({ title }: { title: string }) {
    const [ticketsTypes, setTypes] = useState<Array<TicketsType>>([])
    const selectedTicketsTypes = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === title)?.ticketsTypes || [])
    const defaultValue = selectedTicketsTypes?.map(ticketType => ticketType.id)

    const dispatch = useAppDispatch()
    const onTicketsTypeSelect: (typeIds: Array<number>) => void = (typeIds: Array<number>) => {
        const selectedTypes = (typeIds.map(typeId => ticketsTypes.find(ticketType => ticketType.id === typeId)) as Array<TicketsType>)
        dispatch(changeTicketsTypes({ stateId: title, data: selectedTypes }))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<TicketsType>> = await fetchTicketsTypes()
            if (fetchResult.success) {
                setTypes(fetchResult.data)
            }
        })()
    }, [])

    if (ticketsTypes.length > 0) {
        return (
            <TagBox
                className='CustomersActivity_TicketsTypesSelector'
                displayExpr='name'
                valueExpr='id'
                dataSource={ticketsTypes}
                defaultValue={defaultValue}
                onValueChange={onTicketsTypeSelect}
                placeholder='Select tickets types'
                multiline={true}
                searchEnabled={true}
                showDropDownButton={false}
                label='Tickets types'
                labelMode='static'>
                <DropDownOptionsTagBox
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </TagBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
} 
