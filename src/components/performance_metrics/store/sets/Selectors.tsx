import { SetState } from './SetsReducer'
import { getSelector as getSlctr } from '../../../common/store/multiset_container/Selectors'

function getSelector<R>(selector: (set: SetState | undefined) => R | undefined) {
    return getSlctr<SetState>(selector)
}

export const tentsSelector = getSelector(set => set?.tents)
export const empTentsSelector = getSelector(set => set?.empTents)
export const positionsSelector = getSelector(set => set?.positions)
export const traineeSelector = getSelector(set => set?.trainee)
export const juniorSelector = getSelector(set => set?.junior)
export const secondShiftsSelector = getSelector(set => set?.secondShifts)
export const employeesSelector = getSelector(set => set?.employees)
