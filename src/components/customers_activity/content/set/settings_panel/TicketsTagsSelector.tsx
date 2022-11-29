import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/LoadIndicator'
import FetchResult from '../../../../common/Interfaces'
import { useAppDispatch, useAppSelector, AppStore } from '../../../../common/AppStore'
import { changeSelectedTicketsTags } from '../../../store/Actions'
import { fetchTicketsTags, TicketsTag } from '../../../network_resource_fetcher/FetchTicketsTags'


export default function TicketsTagsSelector({ title }: { title: string }) {
    const [ticketsTags, setTags] = useState<Array<TicketsTag>>([])
    const selectedTicketsTags = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === title)?.selectedTicketsTags || [])
    const defaultValue = selectedTicketsTags?.map(ticketTag => ticketTag.id)

    const dispatch = useAppDispatch()
    const onTicketsTagSelect: (tagIds: Array<number>) => void = (tagIds: Array<number>) => {
        const selectedTags = (tagIds.map(tagId => ticketsTags.find(ticketTag => ticketTag.id === tagId)) as Array<TicketsTag>)
        dispatch(changeSelectedTicketsTags({ title: title, data: selectedTags }))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<TicketsTag>> = await fetchTicketsTags()
            if (fetchResult.success) {
                setTags(fetchResult.data)
            }
        })()
    }, [])

    if (ticketsTags.length > 0) {
        return (
            <TagBox
                className='CustomersActivity_TicketsTagsSelector'
                displayExpr='name'
                valueExpr='id'
                dataSource={ticketsTags}
                defaultValue={defaultValue}
                onValueChange={onTicketsTagSelect}
                placeholder='Select tickets tags'
                multiline={true}
                searchEnabled={true}
                showDropDownButton={false}
                label='Tickets tags'
                labelMode='static'>
                <DropDownOptionsTagBox
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </TagBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
} 
