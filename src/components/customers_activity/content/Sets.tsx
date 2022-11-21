import React from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import Set from './set/Set'

export default function Sets() {
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
                <Set />
                <Set />
            </div>
        </ScrollView>
    )
}
