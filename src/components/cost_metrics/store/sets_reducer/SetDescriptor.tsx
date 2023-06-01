import { SetState, DEFAULT_SET } from './SetsReducer'

export function getAliasedSet(set: SetState) {
    return {
        'Teams': set.empTeams,
        'Tribes': set.empTribes,
        'Positions': set.empPositions,
        'Employees': set.employees
    }
}

export function getSetDataFields() {
    return Object.getOwnPropertyNames(getAliasedSet(DEFAULT_SET)).map(x => {
        return {
            dataField: x,
            filterOperations: ['<=', '=', '!=', '>', 'in', 'notin', 'between', 'notbetween']
        }
    })
}
