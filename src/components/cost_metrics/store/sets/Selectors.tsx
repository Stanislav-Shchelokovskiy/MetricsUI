import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { CostMetricsStore } from '../Store'
import { SetState } from './SetsReducer'

const setsSelector = (store: CostMetricsStore) => store.sets
const setTitleSelector = (store: CostMetricsStore, setTitle: string) => setTitle
const setSelector = (sets: Array<SetState>, setTitle: string) => sets.find(x => x.title === setTitle)

export const empTeamsSelector = createSelector([setsSelector, setTitleSelector], (sets, setTitle) => setSelector(sets, setTitle)?.empTeams)
export const empTribesSelector = createSelector([setsSelector, setTitleSelector], (sets, setTitle) => setSelector(sets, setTitle)?.empTribes)
export const empPositionsSelector = createSelector([setsSelector, setTitleSelector], (sets, setTitle) => setSelector(sets, setTitle)?.empPositions)
