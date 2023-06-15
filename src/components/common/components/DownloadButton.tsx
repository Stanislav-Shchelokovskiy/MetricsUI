import React from 'react'
import { Store } from '@reduxjs/toolkit'
import { useStore } from 'react-redux'
import * as XLSX from 'xlsx'
import { MultisetContainerStore } from '../store/multiset_container/Store'
import FetchResult from '../Interfaces'
import TaskButton from './TaskButton'
import { useMultisetContainerContext } from '../components/multiset_container/MultisetContainerContext'


function DownloadButton() {
    const context = useMultisetContainerContext()
    const store = useStore<MultisetContainerStore>()

    const downloadSetRawData = async (dispatchTaskState: (started: boolean) => void, onError: (message: string) => void) =>
        await tryDownloadExcelData(dispatchTaskState, store, onError, context.rawData.fetchRawData)

    return <TaskButton
        className='CommandButton'
        icon='exportxlsx'
        hint='Download excel'
        task={downloadSetRawData} />
}

export default React.memo(DownloadButton)


type FetchData = (containerState: any, set: any) => Promise<FetchResult<Array<any>>>
async function tryDownloadExcelData(
    setTaskStarted: (started: boolean) => void,
    store: Store<MultisetContainerStore>,
    onError: (message: string) => void,
    fetchData: FetchData,
) {
    try {
        setTaskStarted(true)
        await downloadExcelData(store, fetchData)
    }
    catch (err) {
        onError('Cannot download excel. Try changing sets settings to reduce volume of data.')
    }
    finally {
        setTaskStarted(false)
    }
}

async function downloadExcelData(store: Store<MultisetContainerStore>, fetchData: FetchData) {
    const state = store.getState()
    const rawData = await downloadRawData(state, fetchData)
    saveDataAsExcel(rawData)
}

async function downloadRawData(state: MultisetContainerStore, fetchData: FetchData) {
    let rawData = Array<any>()
    let fetchResults = await Promise.all(state.sets.map((set) => fetchData(state.container, set)))
    for (const fetchResult of fetchResults)
        if (fetchResult.success)
            rawData = rawData.concat(fetchResult.data)
    return rawData
}

function saveDataAsExcel(rawData: Array<any>) {
    const worksheet = XLSX.utils.json_to_sheet(rawData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'sets.xlsx')
}
