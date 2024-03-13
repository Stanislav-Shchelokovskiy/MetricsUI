import { SetState } from './Interfaces'
import { getOptionalFilterParameters, getDefaultBaseSet } from '../../../common/store/multiset_container/sets/Defaults'

export const DEFAULT_SET: SetState = {
    ...getDefaultBaseSet(),
    empTeams: getOptionalFilterParameters<string>(['Support']),
}

export const INITIAL_SETS: Array<SetState> = [DEFAULT_SET]
