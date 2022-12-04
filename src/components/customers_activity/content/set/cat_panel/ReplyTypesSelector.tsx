import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/components/LoadIndicator'
import FetchResult from '../../../../common/Interfaces'
import { useAppDispatch, useAppSelector, AppStore } from '../../../../common/AppStore'
import { changeRepliesTypes } from '../../../store/Actions'
import { fetchRepliesTypes, ReplyType } from '../../../network_resource_fetcher/FetchRepliesTypes'


export default function ReplyTypesSelector({ title }: { title: string }) {
    const [repliesTypes, setTypes] = useState<Array<ReplyType>>([])
    const selectedRepliesTypes = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === title)?.repliesTypes || [])
    const defaultValue = selectedRepliesTypes?.map(replyType => replyType.id)

    const dispatch = useAppDispatch()
    const onRepliesTypeSelect: (typeIds: Array<number>) => void = (typeIds: Array<number>) => {
        const selectedTypes = (typeIds.map(typeId => repliesTypes.find(replyType => replyType.id === typeId)) as Array<ReplyType>)
        dispatch(changeRepliesTypes({ stateId: title, data: selectedTypes }))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<ReplyType>> = await fetchRepliesTypes()
            if (fetchResult.success) {
                setTypes(fetchResult.data)
            }
        })()
    }, [])

    if (repliesTypes.length > 0) {
        return (
            <TagBox
                className='CustomersActivity_ReplyTypesSelector'
                displayExpr='name'
                valueExpr='id'
                dataSource={repliesTypes}
                defaultValue={defaultValue}
                onValueChange={onRepliesTypeSelect}
                placeholder='Select replies type'
                multiline={true}
                searchEnabled={true}
                showDropDownButton={false}
                label='CAT replies types'
                labelMode='static'>
                <DropDownOptionsTagBox
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </TagBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
} 
