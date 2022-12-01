import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/LoadIndicator'
import FetchResult from '../../../../common/Interfaces'
import { useAppDispatch, useAppSelector, AppStore } from '../../../../common/AppStore'
import { changeCustomersGroups } from '../../../store/Actions'
import { fetchCustomersGroups, CustomersGroup } from '../../../network_resource_fetcher/FetchCustomersGroups'


function CustomersGroupsSelector({ title }: { title: string }) {
    const [groups, setGroups] = useState<Array<CustomersGroup>>([])
    const selectedGroups = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === title)?.customersGroups || [])
    const defaultValue = selectedGroups?.map(group => group.id)

    const dispatch = useAppDispatch()
    const onGroupSelect: (groupIds: Array<string>) => void = (groupIds: Array<string>) => {
        const selectedGroups = (groupIds.map(groupId => groups.find(group => group.id === groupId)) as Array<CustomersGroup>)
        dispatch(changeCustomersGroups({ title: title, data: selectedGroups }))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<CustomersGroup>> = await fetchCustomersGroups()
            if (fetchResult.success) {
                setGroups(fetchResult.data)
            }
        })()
    }, [])

    if (groups.length > 0) {
        return (
            <TagBox
                className='CustomersActivity_CustomersGroupsSelector'
                displayExpr='name'
                valueExpr='id'
                dataSource={groups}
                defaultValue={defaultValue}
                onValueChange={onGroupSelect}
                placeholder='Select user groups'
                multiline={true}
                searchEnabled={true}
                showDropDownButton={false}
                label='User groups'
                labelMode='static'>
                <DropDownOptionsTagBox
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </TagBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}

export default React.memo(CustomersGroupsSelector)
