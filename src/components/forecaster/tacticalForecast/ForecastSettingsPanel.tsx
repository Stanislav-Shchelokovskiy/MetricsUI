import React, { useReducer, useEffect, useCallback } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from '../../common/LoadIndicator'
import FetchResult from '../../common/Interfaces'
import { useAppDispatch } from '../../common/AppStore'
import { changeReplyType } from '../store/Actions'
import { fetchReplyTypes } from '../network_resource_fetcher/FetchForecastSettingsValues'


interface ReplyTypeSelectorState {
    replyTypes: Array<string>
    replyType: string
}

const INITIAL_STATE: ReplyTypeSelectorState = {
    replyTypes: Array<string>(),
    replyType: ''
}


const CHANGE_REPLY_TYPES = 'change_reply_types'
const CHANGE_REPLY_TYPE = 'change_reply_type'


function replyTypeSelectorStateReducer(state: ReplyTypeSelectorState, action: AnyAction): ReplyTypeSelectorState {
    switch (action.type) {
        case CHANGE_REPLY_TYPES:
            return {
                ...state,
                replyTypes: action.payload
            }
        case CHANGE_REPLY_TYPE:
            return {
                ...state,
                replyType: action.payload
            }
        default:
            return state
    }
}

function ReplyTypeSelector({ tribeId, defaultReplyType }: { tribeId: string, defaultReplyType: string }) {
    const [incomeSelectorState, replyTypeSelectorDispatch] = useReducer(replyTypeSelectorStateReducer, INITIAL_STATE)

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<string>> = await fetchReplyTypes()
            if (fetchResult.success) {
                replyTypeSelectorDispatch({ type: CHANGE_REPLY_TYPES, payload: fetchResult.data })
                const replyType = defaultReplyType || fetchResult.data[0]
                replyTypeSelectorDispatch({ type: CHANGE_REPLY_TYPE, payload: replyType })
                dispatch(changeReplyType(tribeId, replyType))
            }
        })()
    }, [])

    const dispatch = useAppDispatch()
    const onReplyTypeChange = useCallback((replyType: string) => {
        dispatch(changeReplyType(tribeId, replyType))
    }, [tribeId, dispatch])

    if (incomeSelectorState.replyTypes.length > 0) {
        return (
            <div className='ForecastHeader'>
                <SelectBox
                    dataSource={incomeSelectorState.replyTypes}
                    defaultValue={incomeSelectorState.replyType}
                    onValueChange={onReplyTypeChange}
                    label='Forecast Mode'
                    labelMode='static'
                    width={'22%'}>
                    <DropDownOptions
                        hideOnOutsideClick={true}
                        hideOnParentScroll={true}
                        container='#tribe_accordion' />
                </SelectBox>
            </div>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}

const ForecastSettingsPanel = React.memo(
    function ForecastSettingsPanel(
        {
            tribeId,
            replyType
        }: {
            tribeId: string
            replyType: string
        }
    ) {
        return <ReplyTypeSelector
            tribeId={tribeId}
            defaultReplyType={replyType} />
    }
)

export default ForecastSettingsPanel
