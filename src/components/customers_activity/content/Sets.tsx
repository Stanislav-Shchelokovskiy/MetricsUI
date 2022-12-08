import React from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import Accordion, { Item } from 'devextreme-react/accordion'
import Set from './set/Set'
import { useAppSelector, AppStore } from '../../common/AppStore'
import SetHeader from './set/header/SetHeader'


const renderSetHeader = ({ title }: { title: string }) => {
    return <SetHeader setTitle={title} />
}

export default function Sets() {
    const sets = useAppSelector((state: AppStore) => state.customersActivity.sets)
    return (
        <ScrollView
            className='CustomersActivity_Sets_ScrollView'
            id='CustomersActivity_Sets_ScrollView'
            showScrollbar='onHover'
            scrollByThumb={true}
            scrollByContent={false}
        >
            <Accordion
                className='CustomersActivity_Sets_Accordion'
                id='CustomersActivity_Sets_Accordion'
                collapsible={true}
                multiple={true}
                focusStateEnabled={false}
                keyExpr='title'
                itemTitleRender={renderSetHeader}
            // defaultSelectedItemKeys={forecasterItemsState.expandedItems}
            // onSelectedItemKeysChange={onSelectedItemsChange}
            >
                {sets?.map((set) => {
                    return (
                        <Item title={set} key={set} >
                            <Set
                                key={set}
                                setTitle={set} />
                        </Item>
                    )
                })}
            </Accordion>
        </ScrollView >
    )
}
