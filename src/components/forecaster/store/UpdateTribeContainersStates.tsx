import { TribeContainerState } from './Interfaces'

function updateTribeContainersStates(tribeId: string, states: Array<TribeContainerState>, replaceState: (currState: TribeContainerState) => TribeContainerState): Array<TribeContainerState> {
    const currentTribeContainersStates = Array<TribeContainerState>()
    for (let curr_state of states) {
        if (curr_state.tribeId === tribeId) {
            curr_state = replaceState(curr_state)
        }
        currentTribeContainersStates.push(curr_state)
    }
    return currentTribeContainersStates
}

export default updateTribeContainersStates