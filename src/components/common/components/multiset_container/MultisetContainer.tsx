import React, { useState, useEffect, useCallback, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Plotly from 'plotly.js-basic-dist-min'
import Drawer from 'devextreme-react/drawer'
import ScrollView from 'devextreme-react/scroll-view'
import { ToolbarProps } from './Toolbar/Toolbar'
import { MultisetContainerStore } from '../../store/multiset_container/Store'
import MultisetContainerContent from './MultisetContainerContent'
import GraphSettingsPanel from './graph/GraphSettingsPanel'
import ComparisonGraph from './graph/ComparisonGraph'
import { changeMetric } from '../../store/multiset_container/Actions'



export interface SetProps { setTitle: string }

interface SettingsSetsProps {
    set: FC<SetProps>
}

export function SettingsSets(props: SettingsSetsProps) {
    const sets = useSelector((state: MultisetContainerStore) => state.container.sets)
    return (
        <ScrollView
            className='Sets_ScrollView'
            id='Sets_ScrollView'
            showScrollbar='onHover'
            scrollByThumb={true}
            scrollByContent={false}
        >
            <div id='Sets_ScrollView_div'>
                {sets?.map((set, index) => <props.set setTitle={set} key={`${set}${index}`} />)}
            </div>
        </ScrollView >
    )
}


interface MultisetContainerProps {
    sets: FC<SetProps>
    toolbar: FC<ToolbarProps>
    metric: string
}

export default function MultisetContainer(props: MultisetContainerProps) {
    const dispatch = useDispatch()
    useEffect(() => {
        if (props.metric)
            dispatch(changeMetric(props.metric))
    }, [props.metric])

    const [opened, setOpened] = useState(false)

    useEffect(() => {
        const timerId = setTimeout(() => {
            Plotly.Plots.resize('ComparisonGraph')
            clearTimeout(timerId)
        }, 500)
    }, [opened])

    const showHideMenuCallback = useCallback(() => setOpened(!opened), [opened])

    return (
        <div className='MultisetContainer'>
            <props.toolbar
                showHideMenu={showHideMenuCallback}
                menuOpened={opened}
            />
            <Drawer
                className='MultisetContainer_ContentDrawer'
                opened={opened}
                openedStateMode='shrink'
                position='left'
                revealMode='expand'
                component={props.sets}
                closeOnOutsideClick={true}
            >
                <MultisetContainerContent>
                    <GraphSettingsPanel />
                    <ComparisonGraph />
                </MultisetContainerContent>
            </Drawer >
        </div >
    )
}

MultisetContainer.defaultProps = {
    metric: '',
}
