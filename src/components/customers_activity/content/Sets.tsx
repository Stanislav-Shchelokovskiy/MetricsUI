import React from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import Set from './set/Set'
import { useCustomersActivitySelector, CustomersActivityStore } from '../store/Store'

export default function Sets() {
    const sets = useCustomersActivitySelector((state: CustomersActivityStore) => state.customersActivity.sets)
    return (
        <ScrollView
            className='CustomersActivity_Sets_ScrollView'
            id='CustomersActivity_Sets_ScrollView'
            showScrollbar='onHover'
            scrollByThumb={true}
            scrollByContent={false}
        >
            <div id='CustomersActivity_Sets_ScrollView_div'>
                {sets?.map((set) => <Set setTitle={set} key={set} />)}
            </div>

        </ScrollView >
    )
}
