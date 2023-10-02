import { getSelector } from "../../Selectors"

export const empTribesSelector = getSelector(set => set?.empTribes)
export const empTentsSelector = getSelector(set => set?.empTents)
export const positionsSelector = getSelector(set => set?.positions)
export const levelsSelector = getSelector(set => set?.levels)
export const employeesSelector = getSelector(set => set?.employees)
