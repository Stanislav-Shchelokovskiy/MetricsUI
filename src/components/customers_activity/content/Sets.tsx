import React, { useRef } from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import Set from './set/Set'
import {
    useAppSelector,
    AppStore
} from '../../common/AppStore'

export default function Sets() {
    const renderCount = useRef(0)
    console.log(' Sets render ', renderCount.current++)

    const sets = useAppSelector((state: AppStore) => state.customersActivity.sets)
    return (
        <ScrollView
            className='CustomersActivity_Sets_ScrollView'
            id='CustomersActivity_scrollview'
            showScrollbar='onHover'
            scrollByThumb={true}
            scrollByContent={false}
            height={'80vh'}
        >
            <div className='CustomersActivity_Sets'>
                {sets?.map((set) => {
                    return <Set
                        key={set}
                        title={set} />
                })}
            </div>
        </ScrollView>
    )
}
