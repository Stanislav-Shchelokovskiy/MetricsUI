import { getSelector } from "../../Selectors"

export const tribesSelector = getSelector(set => set?.tribes)
export const tentsSelector = getSelector(set => set?.tents)
