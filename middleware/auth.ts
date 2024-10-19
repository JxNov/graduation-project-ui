export default defineNuxtRouteMiddleware((to, from) => {
    const {$generalStore} = useNuxtApp();
    const publicRoutes = ['/login', '/register'];
    const isLoggedIn = $generalStore.isLogged;

    if (isLoggedIn && publicRoutes.includes(to.path)) {
        return navigateTo('/');
    }

    if (!isLoggedIn && !publicRoutes.includes(to.path)) {
        return navigateTo('/login');
    }
});
