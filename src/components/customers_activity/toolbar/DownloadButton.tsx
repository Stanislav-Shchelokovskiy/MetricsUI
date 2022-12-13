import React, { useCallback } from 'react'
import { useStore } from 'react-redux'
import * as XLSX from 'xlsx'
import { AppStore } from '../../common/AppStore'
import Button from '../../common/components/Button'
import FetchResult from '../../common/Interfaces'
import { fetchTicketsWithIterationsRaw, TicketsWithIterationsRaw } from '../network_resource_fetcher/FetchTicketsWithIterationsRaw'


export default function DownloadButton() {
    const store = useStore<AppStore>()
    const downloadSetRawData = useCallback(() => {
        (async () => {
            const state = store.getState()
            const rawData: Array<TicketsWithIterationsRaw> = await downloadRawData(state)
            saveDataAsExcel(rawData)
        })();
    }, [])
    return <Button icon='download' onClick={downloadSetRawData} />
}


async function downloadRawData(state: AppStore) {
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
            set.controls,
            set.features
        )
        if (fetchResult.success) {
            rawData.push(...fetchResult.data)
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
