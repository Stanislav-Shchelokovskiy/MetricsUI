import React, { useCallback, useReducer } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { useStore } from 'react-redux'
import { Toast } from 'devextreme-react/toast';
import * as XLSX from 'xlsx'
import LoadIndicator from '../../common/components/LoadIndicator'
import { CustomersActivityStore } from '../store/Store'
import Button from '../../common/components/Button'
import FetchResult from '../../common/Interfaces'
import { fetchTicketsWithIterationsRaw, TicketsWithIterationsRaw } from '../network_resource_fetcher/FetchTicketsWithIterationsRaw'

interface ToastConfig {
    message: string
    isVisible: boolean
}

const emptyToastConfig = {
    isVisible: false,
    message: '',
}

interface State {
    downloadStarted: boolean
    toastConfig: ToastConfig
}

const INITIAL_STATE: State = {
    downloadStarted: false,
    toastConfig: emptyToastConfig
}

const CHANGE_DOWNLOAD_STARTED = 'download_started'
const CHANGE_TOAST_CONFIG = 'toast_config'


function stateReducer(state: State, action: AnyAction): State {
    switch (action.type) {
        case CHANGE_DOWNLOAD_STARTED:
            return {
                ...state,
                downloadStarted: action.payload,
            }
        case CHANGE_TOAST_CONFIG:
            return {
                ...state,
                toastConfig: action.payload
            }
        default:
            return state
    }
}

const changeDownloadStarted = (started: boolean): AnyAction => {
    return {
        type: CHANGE_DOWNLOAD_STARTED,
        payload: started
    }
}

const changeToastConfig = (next: ToastConfig): AnyAction => {
    return {
        type: CHANGE_TOAST_CONFIG,
        payload: next
    }
}


function DownloadButton() {
    const [state, stateDispatch] = useReducer(stateReducer, INITIAL_STATE)

    const onError = useCallback(
        (message: string) => {
            stateDispatch(changeToastConfig({
                message: message,
                isVisible: true,
            }));
        }, [])

    const onHiding = useCallback(() => stateDispatch(changeToastConfig(emptyToastConfig)), [])
    const dispatchDownloadStarted = useCallback((started: boolean) => stateDispatch(changeDownloadStarted(started)), [])

    const store = useStore<CustomersActivityStore>()
    const downloadSetRawData = useCallback(() => {
        (async () => {
            await tryDownloadExcelData(dispatchDownloadStarted, store, onError)
        })();
    }, [dispatchDownloadStarted, onError, store])

    return <div className='CustomersActivityDownloadButton'>
        {state.downloadStarted === true ?
            <LoadIndicator width={undefined} height={25} /> :
            <Button
                key='downloadButton'
                icon='exportxlsx'
                hint='Download excel'
                onClick={downloadSetRawData} />}
        <Toast
            visible={state.toastConfig.isVisible}
            message={state.toastConfig.message}
            type='error'
            onHiding={onHiding}
            displayTime={3000}
        />
    </div>
}

export default React.memo(DownloadButton)


async function tryDownloadExcelData(setTaskStarted: (started: boolean) => void, store: any, onError: (message: string) => void) {
    try {
        setTaskStarted(true)
        await downloadExcelData(store)
    }
    catch (err) {
        onError('Cannot download excel. Try changing sets settings to reduce volume of data.')
    }
    finally {
        setTaskStarted(false)
    }
}

async function downloadExcelData(store: any) {
    const state = store.getState()
    const rawData: Array<TicketsWithIterationsRaw> = await downloadRawData(state)
    saveDataAsExcel(rawData)
}

async function downloadRawData(state: CustomersActivityStore) {
    const customersActivityState = state.customersActivity
    const customersActivitySets = state.customersActivitySets
    let rawData: Array<TicketsWithIterationsRaw> = []
    for (const set of customersActivitySets) {
        const fetchResult: FetchResult<Array<TicketsWithIterationsRaw>> = await fetchTicketsWithIterationsRaw(
            customersActivityState.range[0],
            customersActivityState.range[1],
            set.customersGroups,
            set.ticketsTypes,
            set.ticketsTags,
            set.tribes,
            set.repliesTypes,
            set.components,
            set.features
        )
        if (fetchResult.success) {
            rawData = rawData.concat(fetchResult.data)
        }
    }
    return rawData
}

function saveDataAsExcel(rawData: Array<TicketsWithIterationsRaw>) {
    const worksheet = XLSX.utils.json_to_sheet(rawData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'sets.xlsx')
}
