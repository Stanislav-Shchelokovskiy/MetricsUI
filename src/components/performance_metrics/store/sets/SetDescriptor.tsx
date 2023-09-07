import { SetState, DEFAULT_SET } from './SetsReducer'
import { getFilterFields } from '../../../common/components/multiset_container/Toolbar/FilterTooltip'

export function getAliasedSet(set: SetState) {
    return {
        'Tents': set.tents,
        'Employees Tents': set.empTents,
        'Positions': set.positions,
        'Levels': set.levels,
        'Employees': set.employees,
        'SecondShifts': set.secondShifts,
    }
}

export function getSetDataFields() {
    return getFilterFields(getAliasedSet(DEFAULT_SET))
}
