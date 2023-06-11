import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { CostMetricsStore } from '../Store'
import { SetState } from './SetsReducer'

const setsSelector = (store: CostMetricsStore) => store.sets
const setTitleSelector = (store: CostMetricsStore, setTitle: string) => setTitle
const setSelector = (sets: Array<SetState>, setTitle: string) => sets.find(x => x.title === setTitle)

function get_selector<T>(selector: (set: SetState | undefined) => T | undefined) {
    return createSelector([setsSelector, setTitleSelector], (sets, setTitle) => selector(setSelector(sets, setTitle)))
}

export const empTeamsSelector = get_selector(set => set?.empTeams)
export const empTribesSelector = get_selector(set => set?.empTribes)
export const empPositionsSelector = get_selector(set => set?.empPositions)
export const employeesSelector = get_selector(set => set?.employees)
