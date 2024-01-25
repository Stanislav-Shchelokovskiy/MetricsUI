import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TabPanel from 'devextreme-react/tab-panel'
import List from 'devextreme-react/list'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import ScrollView from 'devextreme-react/scroll-view'
import DataSource from 'devextreme/data/data_source'
import Markdown from 'markdown-to-jsx'
import LoadIndicator from '../../../LoadIndicator'
import { useMultisetContainerContext } from '../../MultisetContainerContext'
import { useHelp } from '../../../../hooks/UseHelp'
import { HelpItem, PopupProps, Token } from '../../../../Typing'
import { Button as Button } from 'devextreme-react/button'
import { ClickEvent } from 'devextreme/ui/button'
import { updateFavoriteMetrics } from '../../../../store/multiset_container/non_shareable_state/Actions'
import { Metric } from './Metric'


export interface MetricsPopupProps<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT> extends PopupProps {
    dataSource: DataSource<DataSourceT, ValueExprT>
    value: ValueExprT
    dispatchValue: (value: ValueExprT) => void
    favoriteMetrics: Array<string>
}

export default function MetricsPopup<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT>(props: MetricsPopupProps<DataSourceT, ValueExprT>) {
    const [selected, setSelected] = useState<Array<string>>([props.value as string])
    const context = useMultisetContainerContext()
    const help = useHelp<HelpItem>(context.fetchMetricDescription, selected)

    function itemTitle(data: any) { return data.key }

    function TabPanelItem({ data }: any) {
        function onClick(e: any) { setSelected([(e.itemData as Metric).name]) }
        return <List
            className='tabpanel-item'
            dataSource={data.items}
            displayExpr='displayName'
            keyExpr='name'
            selectionMode='single'
            selectedItemKeys={selected}
            height="100%"
            itemRender={MetricItem}
            onItemClick={onClick}
            focusStateEnabled={false}
        />
    }

    let favorites = [...props.favoriteMetrics]
    function MetricItem(metric: Metric) {
        function onFavoritesClick(e: ClickEvent) {
            e.event?.stopPropagation()
            if (favorites.includes(metric.name)) {
                favorites = favorites.filter(metricName => metricName != metric.name)
                setFavorite(false)
            }
            else {
                favorites.push(metric.name)
                setFavorite(true)
            }
        }
        const [favorite, setFavorite] = useState(favorites.includes(metric.name))
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

    const dispatchFavorites = useDispatch()
    function onHiding() {
        dispatchFavorites(updateFavoriteMetrics(favorites))
        props.onHiding()
    }

    function apply() {
        onHiding()
        // we use timer in order not to disturb animation by update
        const timerId = setTimeout(() => {
            const selectedMetric = selected[0]
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
    return (
        <Popup
            visible={props.visible}
            onHiding={onHiding}
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
                    itemComponent={TabPanelItem}
                    itemTitleTemplate={itemTitle}
                    activeStateEnabled={false}
                    focusStateEnabled={false}
                />
                {help ?
                    <div>
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
                    </div> : <LoadIndicator width={100} height={100} />}
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
