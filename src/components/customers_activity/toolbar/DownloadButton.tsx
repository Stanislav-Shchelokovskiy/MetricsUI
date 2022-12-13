import React, { useCallback, useState } from 'react'
import { useStore } from 'react-redux'
import * as XLSX from 'xlsx'
import LoadIndicator from '../../common/components/LoadIndicator'
import { CustomersActivityStore } from '../store/Store'
import Button from '../../common/components/Button'
import FetchResult from '../../common/Interfaces'
import { fetchTicketsWithIterationsRaw, TicketsWithIterationsRaw } from '../network_resource_fetcher/FetchTicketsWithIterationsRaw'

function DownloadButton({ onError }: { onError: (message: string) => void }) {
    const [taskStarted, setTaskStarted] = useState<boolean>(false);

    const store = useStore<CustomersActivityStore>()
    const downloadSetRawData = useCallback(() => {
        (async () => {
            await tryDownloadExcelData(setTaskStarted, store, onError)
        })();
    }, [onError, store])

    return <div className='CustomersActivityDownloadButton'>
        {taskStarted === true ?
            <LoadIndicator width={undefined} height={25} /> :
            <Button
                key='downloadButton'
                icon='download'
                onClick={downloadSetRawData} />}
    </div>
}

export default React.memo(DownloadButton)


async function tryDownloadExcelData(setTaskStarted: React.Dispatch<React.SetStateAction<boolean>>, store: any, onError: (message: string) => void) {
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
