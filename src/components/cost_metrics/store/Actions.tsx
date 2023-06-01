import { getAction } from "../../common/store/Actions"

export const CHANGE_AGG_BY = 'change_agg_by'
export const changeAggBy = getAction<string | undefined>(CHANGE_AGG_BY)
