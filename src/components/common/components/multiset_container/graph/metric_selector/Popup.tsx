import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TabPanel from 'devextreme-react/tab-panel'
import List from 'devextreme-react/list'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import ScrollView from 'devextreme-react/scroll-view'
import DataSource from 'devextreme/data/data_source'
import Markdown from 'markdown-to-jsx'
import LoadIndicator from '../../../LoadIndicator'
import { useMultisetContainerContext } from '../../MultisetContainerContext'
import { useHelp } from '../../../../hooks/UseHelp'
import { HelpItem, PopupProps } from '../../../../Typing'
import { Button as Button } from 'devextreme-react/button'
import { ClickEvent } from 'devextreme/ui/button'
import { updateFavoriteMetrics } from '../../../../store/multiset_container/non_shareable_state/Actions'
import { favoriteMetricsSelector } from '../../../../store/multiset_container/non_shareable_state/Selectors'
import { Metric } from './Metric'
import { react } from 'plotly.js'


export interface MetricsPopupProps<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT> extends PopupProps {
    dataSource: DataSource<DataSourceT, ValueExprT>
    value: ValueExprT
    dispatchValue: (value: ValueExprT) => void
}

export default function MetricsPopup<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT>(props: MetricsPopupProps<DataSourceT, ValueExprT>) {
    const [selectedMetric, selectMetric] = useState<string>(props.value as string)

    function apply() {
        props.onHiding()
        // we use timer in order not to disturb animation by update
        const timerId = setTimeout(() => {
            if (selectedMetric != props.value)
                props.dispatchValue(selectedMetric as ValueExprT)
            clearTimeout(timerId)
        }, 100)
    }

    const okButtonOptions = {
        icon: 'check',
        hint: 'Apply',
        type: 'normal',
        stylingMode: 'text',
        focusStateEnabled: false,
        onClick: apply,
    }

    function itemTitle(data: any) { return data.key }

    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title='Metrics'
            maxWidth='70vw'
            maxHeight='70vh'
        >
            <div className='ComparisonGraph_MetricsPopup'>
                <TabPanel
                    className='ComparisonGraph_MetricsTabPanel'
                    animationEnabled={true}
                    swipeEnabled={true}
                    dataSource={props.dataSource}
                    tabsPosition='left'
                    stylingMode='primary'
                    iconPosition='start'
                    itemComponent={TabPanelItem(selectedMetric, selectMetric)}
                    itemTitleTemplate={itemTitle}
                    activeStateEnabled={false}
                    focusStateEnabled={false}
                />
                <MetricHelp metricName={selectedMetric} />
            </div>
            <ToolbarItem
                widget='dxButton'
                toolbar='top'
                location='after'
                options={okButtonOptions}
            />
        </Popup >
    )
}

function TabPanelItem(selectedMetric: string, selectMetric: (metricName: string) => void) {
    function onClick(e: any) { selectMetric((e.itemData as Metric).name) }
    return ({ data }: any) => <List
        className='tabpanel-item'
        dataSource={data.items}
        displayExpr='displayName'
        keyExpr='name'
        selectionMode='single'
        selectedItemKeys={[selectedMetric]}
        height="100%"
        itemRender={MetricItem}
        onItemClick={onClick}
        focusStateEnabled={false}
    />
}

function MetricItem(metric: Metric) {
    const dispatchFavorites = useDispatch()
    const favorites = useSelector(favoriteMetricsSelector)

    function onFavoritesClick(e: ClickEvent) {
        e.event?.stopPropagation()
        let newFavorites: Array<string>
        if (favorites.includes(metric.name)) {
            newFavorites = favorites.filter(metricName => metricName != metric.name)
        }
        else {
            newFavorites = [metric.name, ...favorites]
        }
        dispatchFavorites(updateFavoriteMetrics(newFavorites))
    }

    const favorite = favorites.includes(metric.name)
    return (
        <div className='tabpanel-item-info'>
            <div className='tabpanel-item-text'>{metric.displayName}</div>
            <Button
                className={`favoritesButton${favorite ? '-selected' : ''}`}
                id='favoritesButton'
                focusStateEnabled={false}
                hoverStateEnabled={false}
                activeStateEnabled={true}
                icon='favorites'
                stylingMode='text'
                type='normal'
                onClick={onFavoritesClick}
            />
        </div>
    )
}


function MetricHelp({ metricName }: { metricName: string }) {
    const context = useMultisetContainerContext()
    const help = useHelp<HelpItem>(context.fetchMetricDescription, [metricName])
    if (!help)
        return <LoadIndicator width={100} height={100} />
    return <div>
        <ScrollView
            id='Metrics_ScrollView_id'
            showScrollbar='onHover'
            scrollByThumb={true}
            scrollByContent={false}
        >
            <div className='ComparisonGraph_MetricsDesc'>
                <h3 className='title'>{help.title}</h3>
                <span > <Markdown>{help.content}</Markdown> </span>
            </div>
        </ScrollView>
    </div>
}
