import { getIncludePayloadAction } from '../../../common/store/multiset_container/sets/actions/Actions'
import { getPayloadAction } from '../../../common/store/Actions'

export const CHANGE_SECOND_SHIFTS = 'change_second_shifts'
export const CHANGE_SECOND_SHIFTS_INCLUDE = 'change_second_shifts_include'
export const changeSecondShifts = getPayloadAction<boolean>(CHANGE_SECOND_SHIFTS)
export const changeSecondShiftsInclude = getIncludePayloadAction(CHANGE_SECOND_SHIFTS_INCLUDE)
