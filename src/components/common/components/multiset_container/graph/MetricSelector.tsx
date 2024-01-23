import React, { useCallback, useState, useEffect, useMemo } from 'react'
import TabPanel from 'devextreme-react/tab-panel'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import ScrollView from 'devextreme-react/scroll-view'
import DataSource from 'devextreme/data/data_source'
import Markdown from 'markdown-to-jsx'
import LoadIndicator from '../../LoadIndicator'
import OptionSelector from '../../OptionSelector'
import { changeMetric } from '../../../store/multiset_container/Actions'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../../../store/multiset_container/Utils'
import { useMultisetContainerContext } from '../MultisetContainerContext'
import { metricSelector } from '../../../store/multiset_container/Selectors'
import { useHelp } from '../../../hooks/UseHelp'
import { HelpItem, Undefinable, PopupProps } from '../../../Typing'
import { getFavoriteButtonOptions } from '../../Button'


export interface Metric {
    name: string
    displayName: string
    group: string
    context: number
}

export default function MetricSelector() {
    const [metric, dispatchMetric] = useState<Metric>()
    const context = useMultisetContainerContext()
    const defaultValueSelector = useCallback((values: Array<Metric>) => values.find(x => x.context === context.context)?.name || values[0]?.name, [])
    const onValueChangeEx = useCallback((dsVal: Metric) => { dispatchMetric(dsVal) }, [])

    useEffect(() => {
        if (metric)
            context.changeMetric(metric)
    }, [metric])


    const [popupProps, showPopup] = useState<Undefinable<MetricsPopupProps<Metric, string>>>(undefined)
    const [defaultPopupOpened, openDefaultPopup] = useState(false)

    const onPopupShowing = useCallback((
        dataSource: DataSource<Metric, string>,
        value: string,
        dispatchValue: (value: string) => void,
        setFilter: (filter: Array<any> | null) => void,
        cancelDefault: () => void,
        onHiding: () => void
    ) => {
        if (defaultPopupOpened) {
            const metricName = 'name'
            const newFilter: Array<any> = [[metricName, '=', value]]
            for (const filterVal of ['People', 'Tickets', 'Iterations', 'Ticket Cost (gross)']) {
                newFilter.push('or')
                newFilter.push([metricName, '=', filterVal])
            }
            setFilter(newFilter)
            return
        }

        cancelDefault()

        showPopup({
            dataSource: dataSource,
            value: value,
            dispatchValue: dispatchValue,
            visible: true,
            onHiding: onHiding,
        })
    }, [defaultPopupOpened])


    const onHiding = useCallback((clearFilter: () => void) => {
        showPopup(undefined)
        openDefaultPopup(false)
        clearFilter()
    }, [])


    const customButtons = useMemo(() => [{
        ...getFavoriteButtonOptions(),
        onClick: () => openDefaultPopup(true),
    }], [])


    return <><OptionSelector<Metric, string>
        className='ComparisonGraph_MetricSelector'
        displayExpr='displayName'
        valueExpr='name'
        groupExpr='group'
        sortExpr='displayName'
        fetchDataSource={context.fetchMetrics}
        valueSelector={metricSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeMetric}
        onValueChangeEx={onValueChangeEx}
        label='Metric'
        opened={defaultPopupOpened}
        paginate={false}
        onPopupShowing={onPopupShowing}
        onPopupHiding={onHiding}
        customButtons={customButtons}
    />
        {popupProps ? <MetricsPopup {...popupProps} /> : null}
    </>
}

interface MetricsPopupProps<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT> extends PopupProps {
    dataSource: DataSource<DataSourceT, ValueExprT>
    value: ValueExprT
    dispatchValue: (value: ValueExprT) => void
}

function MetricsPopup<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT>(props: MetricsPopupProps<DataSourceT, ValueExprT>) {
    const [selected, setSelected] = useState<string>(props.value as string)
    const context = useMultisetContainerContext()
    const help = useHelp<HelpItem>(context.fetchMetricDescription, [selected])

    function itemTitle(data: any) { return data.key }

    function TabPanelItem({ data }: any) {
        const taskItems = (data.items as Array<any>).map((value, index) => <MetricItem key={index} {...value} />)
        return (
            <ScrollView
                id='Metrics_ScrollView_id1'
                showScrollbar='onHover'
                scrollByThumb={true}
                scrollByContent={false}
            >
                <div className='tabpanel-item'>{taskItems}</div>
            </ScrollView>
        )
    }

    function MetricItem(metric: Metric) {
        function onClick() { setSelected(metric.name) }
        return (
            <div
                className={`tabpanel-item-info ${metric.name == selected ? 'selected' : ''}`}
                onClick={onClick}
            >
                <div className='tabpanel-item-text'>{metric.displayName}</div>
            </div>
        )
    }

    function apply() {
        props.onHiding()
        const timerId = setTimeout(() => {
            if (selected != props.value)
                props.dispatchValue(selected as ValueExprT)
            clearTimeout(timerId)
        }, 100)
    }

    const okButtonOptions = {
        //text: 'Apply',
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

export function metricOrDefault(value: Undefinable<string>): string {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
