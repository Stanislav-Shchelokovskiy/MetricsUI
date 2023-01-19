import React from 'react'
import { useSelector } from 'react-redux'
import ScrollView from 'devextreme-react/scroll-view'
import Set from './set/Set'
import { CustomersActivityStore } from '../store/Store'

export default function Sets() {
    const sets = useSelector((state: CustomersActivityStore) => state.customersActivity.sets)
    return (
        <ScrollView
            className='CustomersActivity_Sets_ScrollView'
            id='CustomersActivity_Sets_ScrollView'
            showScrollbar='onHover'
            scrollByThumb={true}
            scrollByContent={false}
        >
            <div id='CustomersActivity_Sets_ScrollView_div'>
                {sets?.map((set, index) => <Set setTitle={set} key={`${set}${index}`} />)}
            </div>

        </ScrollView >
    )
}
