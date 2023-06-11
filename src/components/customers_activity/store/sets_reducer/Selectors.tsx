import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { CustomersActivityStore } from '../Store'
import { SetState } from './Interfaces'

const setsSelector = (store: CustomersActivityStore) => store.sets
const setTitleSelector = (store: CustomersActivityStore, setTitle: string) => setTitle
const setSelector = (sets: Array<SetState>, setTitle: string) => sets.find(x => x.title === setTitle)

function get_selector<T>(selector: (set: SetState | undefined) => T | undefined) {
    return createSelector([setsSelector, setTitleSelector], (sets, setTitle) => selector(setSelector(sets, setTitle)))
}

export const percentileSelector = get_selector(set => set?.percentile)
export const privacySelector = get_selector(set => set?.privacy)
export const customersGroupsSelector = get_selector(set => set?.customersGroups)
export const ticketsTypesSelector = get_selector(set => set?.ticketsTypes)
export const tribesSelector = get_selector(set => set?.tribes)
export const tentsSelector = get_selector(set => set?.tents)
export const platformsSelector = get_selector(set => set?.platforms)
export const productsSelector = get_selector(set => set?.products)
export const versionsSelector = get_selector(set => set?.versions)
export const ticketsTagsSelector = get_selector(set => set?.ticketsTags)
export const duplicatedToTicketsTypesSelector = get_selector(set => set?.duplicatedToTicketsTypes)
export const fixedInSelector = get_selector(set => set?.fixedIn)
export const fixedBySelector = get_selector(set => set?.fixedBy)
export const fixedBetweenSelector = get_selector(set => set?.fixedBetween)
export const severitySelector = get_selector(set => set?.severity)
export const ticketStatusesSelector = get_selector(set => set?.ticketStatuses)
export const closedBySelector = get_selector(set => set?.closedBy)
export const closedBetweenSelector = get_selector(set => set?.closedBetween)
export const frameworksSelector = get_selector(set => set?.frameworks)
export const operatingSystemsSelector = get_selector(set => set?.operatingSystems)
export const idesSelector = get_selector(set => set?.ides)
export const customersTypesSelector = get_selector(set => set?.customersTypes)
export const conversionsTypesSelector = get_selector(set => set?.conversionsTypes)
export const positionsSelector = get_selector(set => set?.positions)
export const empTribesSelector = get_selector(set => set?.empTribes)
export const empTentsSelector = get_selector(set => set?.empTents)
export const employeesSelector = get_selector(set => set?.employees)
export const assignedToSelector = get_selector(set => set?.assignedTo)
export const repliesTypesSelector = get_selector(set => set?.repliesTypes)
export const componentsSelector = get_selector(set => set?.components)
export const featuresSelector = get_selector(set => set?.features)
export const customersSelector = get_selector(set => set?.customers)
