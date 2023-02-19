import { createApp } from 'vue';
import App from './components/App.vue';

import { createRouter, createWebHashHistory } from "vue-router";
import Students from "./components/Students.vue";
import StudentInfo from "./components/StudentInfo.vue";

import store from "./store.js";

import Login from "./components/Login.vue";

const routes = [
    { path: "/", component: Students, meta: { requiresAuth: true } },
    { path: "/student-info/:id", component: StudentInfo, props: true, meta: { requiresAuth: true } },
    { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.getUser === null) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

createApp(App).use(router).use(store).mount('#app');