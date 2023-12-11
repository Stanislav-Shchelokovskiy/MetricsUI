import { getSelector } from "../../Selectors"
import { nameOf } from "../Interfaces"

export const tribesSelectorName = nameOf('tribes')
export const tentsSelectorName = nameOf('tents')

export const tribesSelector = getSelector(set => set?.tribes)
export const tentsSelector = getSelector(set => set?.tents)
