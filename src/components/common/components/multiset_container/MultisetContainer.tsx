import React, { useState, useEffect, useCallback, PropsWithChildren, FC } from 'react'
import { useSelector } from 'react-redux'
import Plotly from 'plotly.js-basic-dist-min'
import Drawer from 'devextreme-react/drawer'
import ScrollView from 'devextreme-react/scroll-view'
import { ToolbarProps } from './Toolbar/Toolbar'


export interface SetProps { setTitle: string }

interface SettingsSetsProps {
    setsSelector: (store: any) => Array<string>
    set: FC<SetProps>
}

export function SettingsSets(props: SettingsSetsProps) {
    const sets = useSelector(props.setsSelector)
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
    className: string
    plotlyDivId: string | undefined
    sets: FC<SetProps>
    toolbar: FC<ToolbarProps>
}

export default function MultisetContainer(props: PropsWithChildren<MultisetContainerProps>) {
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        const timerId = setTimeout(() => {
            Plotly.Plots.resize('ComparisonGraph')
            clearTimeout(timerId)
        }, 500)
    }, [opened])

    const showHideMenuCallback = useCallback(() => setOpened(!opened), [opened])

    return (
        <div className={props.className}>
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
                {props.children}
            </Drawer >
        </div >
    )
}
