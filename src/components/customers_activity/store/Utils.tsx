import { FilterParametersNode } from '../../common/store/multiset_container/sets/Interfaces'
import { nodeIsEmpty } from '../../common/store/multiset_container/sets/Utils'

export function bugIsNotSelected(node: FilterParametersNode<number> | undefined): boolean {
    const BUG = 2
    return nodeIsEmpty(node, BUG)
}

export function closedIsNotSelected(node: FilterParametersNode<string> | undefined): boolean {
    const CLOSED = 'Closed'
    return nodeIsEmpty(node, CLOSED)
}
