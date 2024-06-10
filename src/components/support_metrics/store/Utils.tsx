import { StrictNumberFilterParameters, StringFilterParameters } from '../../common/store/multiset_container/sets/Interfaces'
import { nodeIsEmpty } from '../../common/store/multiset_container/Utils'

export function bugIsNotSelected(node: StrictNumberFilterParameters): boolean {
    const BUG = 2
    return nodeIsEmpty(node, BUG)
}

export function closedIsNotSelected(node: StringFilterParameters): boolean {
    const CLOSED = 'Closed'
    return nodeIsEmpty(node, CLOSED)
}
