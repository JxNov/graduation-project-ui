export const items = ['read', 'create', 'update', 'delete'];

export const expandPermissions = (permissions: string[], items: string[]): string[] => {
    return permissions.flatMap(permission => {
        if (permission.endsWith('.*')) {
            const [group] = permission.split('.*');
            return items.map(item => `${group}.${item}`);
        }
        return permission;
    });
};

export const hasPermission = (permissions: string[] | undefined, userPermissions: string[]): boolean => {
    if (!permissions || permissions.length === 0) return true;
    const expandedPermissions = expandPermissions(permissions, items);
    return expandedPermissions.some(permission => userPermissions.includes(permission));
};