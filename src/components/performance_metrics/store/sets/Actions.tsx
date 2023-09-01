import { getIncludePayloadAction } from '../../../common/store/multiset_container/sets/actions/Actions'
import { getPayloadAction } from '../../../common/store/Actions'

export const CHANGE_JUNIOR = 'change_junior'
export const CHANGE_JUNIOR_INCLUDE = 'change_junior_include'
export const changeJunior = getPayloadAction<boolean>(CHANGE_JUNIOR)
export const changeJuniorInclude = getIncludePayloadAction(CHANGE_JUNIOR_INCLUDE)

export const CHANGE_TRAINEE = 'change_trainee'
export const CHANGE_TRAINEE_INCLUDE = 'change_trainee_include'
export const changeTrainee = getPayloadAction<boolean>(CHANGE_TRAINEE)
export const changeTraineeInclude = getIncludePayloadAction(CHANGE_TRAINEE_INCLUDE)

export const CHANGE_SECOND_SHIFTS = 'change_second_shifts'
export const CHANGE_SECOND_SHIFTS_INCLUDE = 'change_second_shifts_include'
export const changeSecondShifts = getPayloadAction<boolean>(CHANGE_SECOND_SHIFTS)
export const changeSecondShiftsInclude = getIncludePayloadAction(CHANGE_SECOND_SHIFTS_INCLUDE)
