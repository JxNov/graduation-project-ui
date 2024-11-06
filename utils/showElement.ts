export const showElement = (permissions: string[], userPermissions: string[]): boolean => {
  if (!permissions || permissions.length === 0) return true
  return permissions.some(permission => userPermissions.includes(permission))
}