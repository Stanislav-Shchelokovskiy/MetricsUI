import { getAction } from '../../../common/store/Actions'

export const CHANGE_BASELINE_ALIGNED_MODE = 'customers_activity/change_baseline_aligned_mode'
export const changeBaselineAlignedMode = getAction<boolean>(CHANGE_BASELINE_ALIGNED_MODE)
