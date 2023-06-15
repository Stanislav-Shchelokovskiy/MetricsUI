import { SetState } from './SetsReducer'
import { getSelector as getSlctr } from '../../../common/store/multiset_container/Selectors'

function getSelector<R>(selector: (set: SetState | undefined) => R | undefined) {
    return getSlctr<SetState>(selector)
}

export const empTeamsSelector = getSelector(set => set?.empTeams)
export const empTribesSelector = getSelector(set => set?.empTribes)
export const empPositionsSelector = getSelector(set => set?.empPositions)
export const employeesSelector = getSelector(set => set?.employees)
