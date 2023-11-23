import { SupportMetricsStore } from "./Store"
import { booleanSetting } from "../../common/Typing"

export function baselineAlignedModeSelector(store: SupportMetricsStore): boolean {
    return booleanSetting(store.container.baselineAlignedModeEnabled)
}
