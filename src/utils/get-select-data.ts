export const getSelectData = (data: string[]) => {
  return Object.fromEntries(data?.map((field) => [field, 1]))
}

export const getUnSelectData = (data: string[]) => {
  return Object.fromEntries(data?.map((field) => [field, 0]))
}
