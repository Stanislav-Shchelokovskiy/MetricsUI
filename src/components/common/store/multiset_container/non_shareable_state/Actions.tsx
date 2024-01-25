import { getAction } from '../../Actions'

export const UPDATE_FAVORITE_METRICS = 'update_favorite_metrics'
export const updateFavoriteMetrics = getAction<Array<string>>(UPDATE_FAVORITE_METRICS)
