import { SetState } from './SetsReducer'
import { getSelector } from '../../../common/store/multiset_container/Selectors'
import { nameOf } from '../../../common/store/multiset_container/sets/Interfaces'

export const empTeamsSelectorName = nameOf<SetState>('empTeams')
export const empTeamsSelector = getSelector<SetState>(set => set?.empTeams)
