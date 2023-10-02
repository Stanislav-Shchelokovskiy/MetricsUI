import { SetState } from './SetsReducer'
import { getSelector } from '../../../common/store/multiset_container/Selectors'

export const empTeamsSelector = getSelector<SetState>(set => set?.empTeams)
