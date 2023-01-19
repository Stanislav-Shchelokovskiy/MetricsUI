import React, { useCallback, useEffect, useState } from 'react'
import { Popup } from 'devextreme-react/popup'
import Accordion, { Item } from 'devextreme-react/accordion'
import ScrollView from 'devextreme-react/scroll-view'
import Button from '../Button'
import { PopupProps, ComponentProps } from '../../Interfaces'
import FetchResult from '../../../common/Interfaces'
import LoadIndicator from '../LoadIndicator'
import Markdown from 'markdown-to-jsx';

export interface HelpItem {
    title: string
    content: string
}

interface Props extends ComponentProps {
    visible: boolean
    fetchHelpItems: (...args: any) => Promise<FetchResult<Array<HelpItem>>>
    fetchArgs: Array<any>
}

type HelpPopupProps = PopupProps & Props

function HelpButton(props: Props) {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)

    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])
    if (props.visible) {
        return (
            <div className={props.className}>
                <Button
                    icon='help'
                    hint='Help'
                    onClick={onClick} />
                <HelpPopup
                    {...props}
                    visible={popupVisible}
                    onHiding={onHiding} />
            </div>
        )
    }
    return null
}

export default React.memo(HelpButton)


function HelpPopup(props: HelpPopupProps) {
    const [helpItems, setHelpItems] = useState<Array<HelpItem>>([])

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<HelpItem>> = await props.fetchHelpItems(...props.fetchArgs)
            if (fetchResult.success)
                setHelpItems(fetchResult.data)
        })()
    }, [...props.fetchArgs])

    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title='Help'
            maxWidth='70vw'
            maxHeight='90vh'
        >
            {helpItems.length > 0 ?
                <ScrollView
                    className={`${props.className}_ScrollView`}
                    id={`${props.className}_ScrollView_id`}
                    showScrollbar='onHover'
                    scrollByThumb={true}
                    scrollByContent={false}
                >
                    <Accordion
                        collapsible={true}
                        multiple={true}
                        focusStateEnabled={false}
                        keyExpr='title'
                        defaultSelectedIndex={-1}
                    >
                        {helpItems?.map((helpItem, index) => {
                            return <Item title={helpItem.title} key={`${helpItem.title}${index}`}>
                                <Markdown>{helpItem.content}</Markdown>
                            </Item>
                        })}
                    </Accordion>
                </ScrollView> :
                <LoadIndicator width={undefined} height={50} />
            }
        </Popup >

    )
}

HelpButton.defaultProps = {
    visible: true,
    fetchArgs: []
}
