import { navMenu, navMenuBottom } from '~/constants/menus'

const items = ['read', 'create', 'update', 'delete']

const expandPermissions = (permissions: string[]) => {
  return permissions.flatMap(permission => {
    if (permission.endsWith('.*')) {
      return items.map(item => permission.replace('.*', `.${item}`))
    }
    return permission
  })
}

const hasPermission = (permissions: string[], userPermissions: string[]) => {
  if (permissions.length === 0) {
    return true
  }

  const expandedPermissions = expandPermissions(permissions)
  return expandedPermissions.some(permission => userPermissions.includes(permission))
}

const checkRoutePermission = (to: any, path: string, permissions: string[], userPermissions: string[]) => {
  if (to.path === path) {
    if (!hasPermission(userPermissions, permissions)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }
  }
}

export default defineNuxtRouteMiddleware((to, from) => {
  const { $authStore } = useNuxtApp()
  const permissions = $authStore.user.permissions

  checkRoutePermission(to, '/admin/generations/trash', permissions, ['admin.read'])
  checkRoutePermission(to, '/admin/academic-years/trash', permissions, ['admin.read'])
  checkRoutePermission(to, '/admin/semesters/trash', permissions, ['admin.read'])
  checkRoutePermission(to, '/admin/classes/trash', permissions, ['admin.read'])
  checkRoutePermission(to, '/admin/users/trash', permissions, ['admin.read'])

  const routes = navMenu.concat(navMenuBottom).reduce((acc: any[], item) => {
    if ('permissions' in item && item.permissions) {
      acc.push({
        path: item.link,
        permissions: item.permissions
      })
    }
    if ('children' in item && item.children) {
      item.children.forEach(child => {
        acc.push({
          path: child.link,
          permissions: child.permissions || []
        })
      })
    }
    return acc
  }, [])

  const matchedRoute = routes.find(routeItem => routeItem.path === to.path)

  if (matchedRoute && !hasPermission(matchedRoute.permissions, permissions)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  return
})
