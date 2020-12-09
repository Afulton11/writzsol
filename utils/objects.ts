// https://stackoverflow.com/a/38340374
export const removeEmptyProperties = <T>(
  obj: T,
  { removeEmptyStrings } = { removeEmptyStrings: true }
): Partial<T> => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object')
      removeEmptyProperties(obj[key])
    else if (obj[key] === undefined || (removeEmptyStrings && obj[key] === ''))
      delete obj[key]
  })
  return obj
}

export const removeEqualProperties = <T>(
  removeFrom: T,
  other: T
): Partial<T> => {
  Object.keys(removeFrom).forEach((key) => {
    if (removeFrom[key] && other[key] && typeof removeFrom[key] === 'object')
      removeEqualProperties(removeFrom[key], other[key])
    else if (removeFrom[key] === other[key]) delete removeFrom[key]
  })
  return removeFrom
}
