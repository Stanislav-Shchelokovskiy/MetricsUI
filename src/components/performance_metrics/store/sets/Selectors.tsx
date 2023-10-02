import { SetState } from './SetsReducer'
import { getSelector } from '../../../common/store/multiset_container/Selectors'

export const secondShiftsSelector = getSelector<SetState>(set => set?.secondShifts)
