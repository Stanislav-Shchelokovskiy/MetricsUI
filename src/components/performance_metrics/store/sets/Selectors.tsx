import { SetState } from './SetsReducer'
import { getSelector as getSlctr } from '../../../common/store/multiset_container/Selectors'

function getSelector<R>(selector: (set: SetState | undefined) => R | undefined) {
    return getSlctr<SetState>(selector)
}

export const tentsSelector = getSelector(set => set?.tents)
export const empTentsSelector = getSelector(set => set?.empTents)
export const positionsSelector = getSelector(set => set?.positions)
export const levelsSelector = getSelector(set => set?.levels)
export const employeesSelector = getSelector(set => set?.employees)
export const secondShiftsSelector = getSelector(set => set?.secondShifts)
