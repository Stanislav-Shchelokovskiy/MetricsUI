import React, { useCallback, useMemo } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import { useAppDispatch } from '../../../common/AppStore'
import { changePositionsFilter } from '../../store/Actions'


export default function PositionsSelector({ tribeId, defaultPositions }: { tribeId: string, defaultPositions: Array<string> }) {
    const positions = useMemo<Array<string>>(() => { return ['Support', 'Developer', 'EM', 'PM', 'Technical Writer'] }, [])

    const dispatch = useAppDispatch()
    const onPositionsChange = useCallback((positions: Array<string>) => {
        dispatch(changePositionsFilter(tribeId, positions))
    }, [tribeId, dispatch])

    return (
        <TagBox className='PositionsSelector'
            placeholder='Select positions to filter by...'
            dataSource={positions}
            defaultValue={defaultPositions}
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Display only positions'
            labelMode='static'
            onValueChange={onPositionsChange}>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true}
                container='#tribe_accordion' />
        </TagBox>
    )
}
