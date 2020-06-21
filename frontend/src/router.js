import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Projects from '@/components/Projects'
import Login from '@/components/Login'
import Register from '@/components/Register'
import User from '@/components/User'

import store from './store'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Welcome },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/user', component: User },
        {
            path: '/projects',
            component: Projects,
            meta: {
                requiresAuth: true
            }
        },

        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isLoggedIn) {
            next({
                path: '/login'
            })
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;