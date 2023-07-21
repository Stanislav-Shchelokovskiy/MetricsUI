import React, { useCallback, useState, useEffect, useMemo, FC } from 'react'
import OptionSelector from '../../OptionSelector'
import { changeMetric } from '../../../store/multiset_container/Actions'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../../../store/multiset_container/Utils'
import { useMultisetContainerContext } from '../MultisetContainerContext'
import { metricSelector } from '../../../store/multiset_container/Selectors'
import { getHelpButtonOptions } from '../../Button'
import { useHelp } from '../../../hooks/UseHelp'
import { Popup } from 'devextreme-react/popup'
import Markdown from 'markdown-to-jsx'
import ScrollView from 'devextreme-react/scroll-view'
import { HelpItem } from '../../../Interfaces'
import { useSelector } from 'react-redux'


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
    const onValueChangeEx = useCallback((dsVal: Metric) => {
        dispatchMetric(dsVal)
    }, [])

    useEffect(() => {
        if (metric)
            context.changeMetric(metric)
    }, [metric])


    return <HelpProvider
        Wrapped={OptionSelector}
        className='ComparisonGraph_MetricSelector'
        displayExpr='displayName'
        valueExpr='name'
        groupExpr='group'
        fetchDataSource={context.fetchMetrics}
        valueSelector={metricSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeMetric}
        onValueChangeEx={onValueChangeEx}
        label='Metric'
        fetchMetricDescription={context.metricDescription.fetchMetricDescription}
        fetchArgsSelector={metricSelector}
    />
}

interface HelpProviderProps {
    Wrapped: FC<any>
    fetchMetricDescription: (...args: any) => any
    fetchArgsSelector: (store: any) => any
}
function HelpProvider({ Wrapped, fetchMetricDescription, fetchArgsSelector, ...wrappedProps }: HelpProviderProps & any) {
    const metric = useSelector<any>(fetchArgsSelector)

    const help = useHelp<HelpItem>(fetchMetricDescription, [metric])
    const [helpPopupVisible, setHelpPopupVisible] = useState(false)

    const hideHelpPopup = useCallback(() => {
        setHelpPopupVisible(false)
    }, [])

    const customButtons = useMemo(() => help ? [
        {
            ...getHelpButtonOptions(),
            onClick: (e: any) => { if (help) setHelpPopupVisible(true) }
        }] : [], [help])

    return <>
        <Wrapped
            {...wrappedProps}
            customButtons={customButtons}
        />
        {help ?
            <Popup
                visible={helpPopupVisible}
                onHiding={hideHelpPopup}
                dragEnabled={false}
                hideOnOutsideClick={true}
                showCloseButton={true}
                showTitle={true}
                title={help.title}
                maxWidth='70vw'
                maxHeight='90vh'

            >
                <ScrollView
                    className='Help_ScrollView'
                    id='Help_ScrollView_id'
                    showScrollbar='onHover'
                    scrollByThumb={true}
                    scrollByContent={false}
                >
                    <Markdown>{help.content}</Markdown>
                </ScrollView>

            </Popup > :
            null
        }
    </>
}

export function getValidMetricOrDefault(value: string | undefined) {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
