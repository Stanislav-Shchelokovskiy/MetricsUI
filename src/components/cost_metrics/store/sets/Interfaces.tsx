import { BaseSetState } from '../../../common/store/multiset_container/sets/Interfaces'
import { StringFilterParameters } from '../../../common/store/multiset_container/sets/Interfaces'

export interface SetState extends BaseSetState {
    empTeams: StringFilterParameters
}
