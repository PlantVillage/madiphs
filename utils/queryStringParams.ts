import qs from 'qs'

// ################################################## Stringify ########################################################
export const stringifyQueryStringParams = (params: Record<string, unknown>) =>
  qs.stringify(params, {
    arrayFormat: 'brackets',
    sort,
    filter,
  })

function sort(a: string, b: string) {
  return a.localeCompare(b)
}

function filter(_: unknown, value: unknown) {
  if (value === '' || value === null || value === undefined) return undefined
  return value
}

// #################################################### Read ###########################################################
export const parseQueryStringParams = (params: string) => qs.parse(params, { parameterLimit: 20 })

export function parseValue(val: unknown): unknown {
  if (typeof val == 'undefined' || val == '') {
    return null
  }
  else if (isBoolean(val)) {
    return parseBoolean(val)
  }
  else if (isArray(val)) {
    return parseArray(val)
  }
  else if (isObject(val)) {
    return parseObject(val)
  }
  else if (isNumber(val)) {
    return parseNumber(val)
  }
  else {
    return val
  }
}

function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && val.constructor === Object
}

function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

function isNumber(val: unknown) {
  return typeof val === 'string' && !isNaN(parseFloat(val)) && isFinite(Number(val))
}

function isBoolean(val: unknown) {
  return val === 'false' || val === 'true'
}

function parseObject(obj: Record<string, unknown>) {
  return Object.entries(obj).reduce(
    (acc, [key, val]) => ({ ...acc, [key]: parseValue(val) }),
    {} as Record<string, unknown>,
  )
}

function parseArray(arr: unknown[]): unknown[] {
  return arr.map(val => parseValue(val))
}

function parseNumber(val: unknown) {
  return Number(val)
}

function parseBoolean(val: unknown) {
  return val === 'true'
}
