import React, { useReducer, useEffect, useCallback } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import LoadIndicator from '../../../common/components/LoadIndicator'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import FetchResult from '../../../common/Interfaces'
import { fetchTiles } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { useAppDispatch } from '../../../common/AppStore'
import { changeTile } from '../../store/Actions'


interface TileSelectorState {
    tiles: Array<number>
    tile: number
}

const INITIAL_STATE: TileSelectorState = {
    tiles: Array<number>(),
    tile: 0
}

const CHANGE_TILES = 'change_tiles'
const CHANGE_TILE = 'change_tile'

function tileSelectorStateReducer(state: TileSelectorState, action: AnyAction): TileSelectorState {
    switch (action.type) {
        case CHANGE_TILES:
            return {
                ...state,
                tiles: action.payload
            }
        case CHANGE_TILE:
            return {
                ...state,
                tile: action.payload
            }
        default:
            return state
    }
}


export default function TilesSelector(
    {
        tribeId,
        defaultTile,
    }:
        {
            tribeId: string
            defaultTile: number
        }
) {
    const [tilesSelectorState, tilesSelectorDispatch] = useReducer(tileSelectorStateReducer, INITIAL_STATE)

    useEffect(() => {
        (async () => {
            const tilesFetchResult: FetchResult<Array<number>> = await fetchTiles()
            if (tilesFetchResult.success) {
                tilesSelectorDispatch({ type: CHANGE_TILES, payload: tilesFetchResult.data })
                const tile = defaultTile || tilesFetchResult.data[0]
                tilesSelectorDispatch({ type: CHANGE_TILE, payload: tile })
                dispatch(changeTile(tribeId, tile))
            }
        })()
    }, [])

    const dispatch = useAppDispatch()
    const onTileChange = useCallback((tile: number) => {
        dispatch(changeTile(tribeId, tile))
    }, [tribeId, dispatch])

    if (tilesSelectorState.tiles.length > 0) {
        return (
            <SelectBox
                dataSource={tilesSelectorState.tiles}
                defaultValue={tilesSelectorState.tile}
                onValueChange={onTileChange}
                label='Performance Level'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}
