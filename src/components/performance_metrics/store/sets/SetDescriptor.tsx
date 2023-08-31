import { SetState, DEFAULT_SET } from './SetsReducer'
import { getFilterFields } from '../../../common/components/multiset_container/Toolbar/FilterTooltip'

export function getAliasedSet(set: SetState) {
    return {
        'Tents': set.tents,
        'Employees Tents': set.empTents,
        'Positions': set.positions,
        'Trainee': set.trainee,
        'Junior': set.junior,
        'SecondShifts': set.secondShifts,
        'Employees': set.employees,
    }
}

export function getSetDataFields() {
    return getFilterFields(getAliasedSet(DEFAULT_SET))
}
