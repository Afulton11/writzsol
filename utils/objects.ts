// https://stackoverflow.com/a/38340374
export const removeEmptyProperties = <T>(
  obj: T,
  { removeEmptyStrings } = { removeEmptyStrings: true }
): Partial<T> => {
  const cleanedObj = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object')
      cleanedObj[key] = removeEmptyProperties(obj[key])
    else if (obj[key] !== undefined && !(removeEmptyStrings && obj[key] === ''))
      cleanedObj[key] = obj[key]
  })
  return cleanedObj
}

export const removeEqualProperties = <T>(
  removeFrom: T,
  other: T
): Partial<T> => {
  const cleanedObj = {}
  Object.keys(removeFrom).forEach((key) => {
    if (removeFrom[key] && other[key] && typeof removeFrom[key] === 'object')
      cleanedObj[key] = removeEqualProperties(removeFrom[key], other[key])
    else if (removeFrom[key] !== other[key]) cleanedObj[key] = removeFrom[key]
  })
  return cleanedObj
}
