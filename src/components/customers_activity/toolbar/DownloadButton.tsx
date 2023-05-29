import React from 'react'
import { useStore } from 'react-redux'
import * as XLSX from 'xlsx'
import { CustomersActivityStore } from '../store/Store'
import { fetchTicketsWithIterationsRaw, TicketsWithIterationsRaw } from '../network_resource_fetcher/FetchTicketsWithIterationsRaw'
import TaskButton from '../../common/components/TaskButton'


function DownloadButton() {
    const store = useStore<CustomersActivityStore>()

    const downloadSetRawData = async (
        dispatchTaskState: (started: boolean) => void,
        onError: (message: string) => void,
    ) => {
        await tryDownloadExcelData(dispatchTaskState, store, onError)
    }
    return <TaskButton
        className='CommandButton'
        icon='exportxlsx'
        hint='Download excel'
        task={downloadSetRawData} />
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
    const customersActivityState = state.container
    const customersActivitySets = state.sets
    let rawData: Array<TicketsWithIterationsRaw> = []
    let fetchResults = await Promise.all(customersActivitySets.map((set) => fetchTicketsWithIterationsRaw(customersActivityState, set,)))
    for (const fetchResult of fetchResults)
        if (fetchResult.success)
            rawData = rawData.concat(fetchResult.data) 
    return rawData
}

function saveDataAsExcel(rawData: Array<TicketsWithIterationsRaw>) {
    const worksheet = XLSX.utils.json_to_sheet(rawData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'sets.xlsx')
}
