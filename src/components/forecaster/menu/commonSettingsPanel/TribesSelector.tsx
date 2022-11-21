import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import { Tribe } from '../../Tribe'
import LoadIndicator from '../../../common/LoadIndicator'
import FetchResult from '../../network_resource_fetcher/FetchResult'
import { fetchTribes } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeSelectedTribes } from '../../store/Actions'
import { useForecasterDispatch, useForecasterSelector, ForecasterStore } from '../../store/ForecasterStore'

export default function TribesSelector() {
    const [tribes, setTribes] = useState<Array<Tribe>>([])
    const selectedTribes = useForecasterSelector((store: ForecasterStore) => store.forecaster.selectedTribes)
    const defaultValue = selectedTribes?.map(tribe => tribe.id)

    const dispatch = useForecasterDispatch()
    const onTribeSelect: (tribes: Array<string>) => void = (tribeIds: Array<string>) => {
        const selectedTribes = (tribeIds.map(tribeId => tribes.find(tribe => tribe.id === tribeId)) as Array<Tribe>)
        dispatch(changeSelectedTribes(selectedTribes))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<Tribe>> = await fetchTribes()
            if (fetchResult.success) {
                setTribes(fetchResult.data)
            }
        })()
    }, [])

    if (tribes.length > 0) {
        return (
            <TagBox className='TribesSelector'
                displayExpr='name'
                valueExpr='id'
                dataSource={tribes}
                defaultValue={defaultValue}
                onValueChange={onTribeSelect}
                placeholder='Select tribes to display...'
                multiline={true}
                selectAllMode='allPages'
                showSelectionControls={true}
                showDropDownButton={false}
                label='Tribes'
                labelMode='static'>
                <DropDownOptionsTagBox
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </TagBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}
