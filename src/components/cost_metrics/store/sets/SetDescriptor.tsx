import { SetState } from './Interfaces'
import { DEFAULT_SET } from './Defaults'
import { getFilterFields } from '../../../common/components/multiset_container/Toolbar/FilterTooltip'

export function getAliasedSet(set: SetState) {
    return {
        'Teams': set.empTeams,
        'Tribes': set.empTribes,
        'Tents': set.empTents,
        'Positions': set.positions,
        'Employees': set.employees
    }
}

export function getSetDataFields() {
    return getFilterFields(getAliasedSet(DEFAULT_SET))
}
