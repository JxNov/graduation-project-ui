export const hasPermission = (permissions: string[], userPermissions: string[]): boolean => {
    return permissions.length === 0 || permissions.some(permission => userPermissions.includes(permission));
};

export const showElement = (permissions: string[], userPermissions: string[]): boolean => {
    return hasPermission(permissions, userPermissions);
};