import { Temporal } from 'temporal-polyfill'
import { computed, type ModelRef, type Ref } from 'vue'

type ObjectDateRange<T extends string> = {
  [k in T]?: Temporal.PlainDate | string | undefined;
}

export const useObjectDateRangeAdapter = <T extends string>(
  model: ModelRef<ObjectDateRange<T>> | Ref<ObjectDateRange<T>>,
  startKey: T,
  endKey: T,
  stringify = false,
) => {
  const dateRange = computed({
    get() {
      if (!model || !model.value[startKey] || !model.value[endKey]) return []
      return [new Date(String(model.value[startKey])), new Date(String(model.value[endKey]))]
    },
    set(range) {
      if (!range) {
        model.value[startKey] = undefined
        model.value[endKey] = undefined
        return
      }
      if (range.filter(Boolean).length < 2) return
      const [start, end] = range
      const startDate = createTemporalPlainDate(start)
      const endDate = createTemporalPlainDate(end)
      model.value[startKey] = stringify ? startDate.toString() : startDate
      model.value[endKey] = stringify ? endDate.toString() : endDate
    },
  })

  return { dateRange }
}

function createTemporalPlainDate(d: Date) {
  return Temporal.PlainDate.from({
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
  })
}
