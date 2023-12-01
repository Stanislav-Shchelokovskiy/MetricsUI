import { groupByOrDefault } from "../GroupBySelector"
import { Context } from "../../../../store/multiset_container/Context"

describe('testing groupByOrDefault', () => {
    test('support context', () => {
        expect(groupByOrDefault(undefined, Context.Support)).toEqual('%Y-%m')
        expect(groupByOrDefault('qwe', Context.Support)).toEqual('%Y-%m')
        expect(groupByOrDefault('%Y-%W', Context.Support)).toEqual('%Y-%W')
    });

    test('cost context', () => {
        expect(groupByOrDefault(undefined, Context.Cost)).toEqual('%Y-%m')
        expect(groupByOrDefault('qwe', Context.Cost)).toEqual('%Y-%m')
        expect(groupByOrDefault('%Y-%W', Context.Cost)).toEqual('%Y-%W')
    });

    test('performance context', () => {
        expect(groupByOrDefault(undefined, Context.Performance)).toEqual('%Y-%m')
        expect(groupByOrDefault('qwe', Context.Performance)).toEqual('%Y-%m')
        expect(groupByOrDefault('%Y-%W', Context.Performance)).toEqual('%Y-%W')
    });
})
