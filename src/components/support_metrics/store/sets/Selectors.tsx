import { SetState } from './Interfaces'
import { getSelector as getSlctr } from '../../../common/store/multiset_container/Selectors'

function getSelector<R>(selector: (set: SetState | undefined) => R | undefined) {
    return getSlctr<SetState>(selector)
}

export const percentileSelector = getSelector(set => set?.percentile)
export const privacySelector = getSelector(set => set?.privacy)
export const customersGroupsSelector = getSelector(set => set?.customersGroups)
export const ticketsTypesSelector = getSelector(set => set?.ticketsTypes)
export const platformsSelector = getSelector(set => set?.platforms)
export const productsSelector = getSelector(set => set?.products)
export const versionsSelector = getSelector(set => set?.versions)
export const ticketsTagsSelector = getSelector(set => set?.ticketsTags)
export const duplicatedToTicketsTypesSelector = getSelector(set => set?.duplicatedToTicketsTypes)
export const fixedInSelector = getSelector(set => set?.fixedIn)
export const fixedBySelector = getSelector(set => set?.fixedBy)
export const fixedBetweenSelector = getSelector(set => set?.fixedBetween)
export const severitySelector = getSelector(set => set?.severity)
export const ticketStatusesSelector = getSelector(set => set?.ticketStatuses)
export const closedBySelector = getSelector(set => set?.closedBy)
export const closedBetweenSelector = getSelector(set => set?.closedBetween)
export const frameworksSelector = getSelector(set => set?.frameworks)
export const operatingSystemsSelector = getSelector(set => set?.operatingSystems)
export const idesSelector = getSelector(set => set?.ides)
export const customersTypesSelector = getSelector(set => set?.customersTypes)
export const conversionsTypesSelector = getSelector(set => set?.conversionsTypes)
export const assignedToSelector = getSelector(set => set?.assignedTo)
export const repliesTypesSelector = getSelector(set => set?.repliesTypes)
export const componentsSelector = getSelector(set => set?.components)
export const featuresSelector = getSelector(set => set?.features)
export const customersSelector = getSelector(set => set?.customers)
