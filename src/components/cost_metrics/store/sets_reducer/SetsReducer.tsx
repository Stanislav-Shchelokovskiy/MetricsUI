import { Set } from './Interfaces'
import { INITIAL_SETS, DEFAULT_SET } from './Defaults'
import { getSetsReducer } from '../../../common/store/set_container/sets/SetsReducer'

export const setsReducer = getSetsReducer<Set>(DEFAULT_SET, INITIAL_SETS)
