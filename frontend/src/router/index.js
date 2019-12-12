import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from '@/store/index'
import Notfound from '../modules/Notfound.vue'
import Sockets from '../modules/sample.vue'
import Educator from '../views/Educator.vue'
import Student from '../modules/geneva/Form.vue'
import Requests from '../modules/tibs/RequestContainer.vue'
import Mostly from '../modules/redgie/Mostly.vue'
import Stamp from '../modules/redgie/Stamp.vue'
import unreadRequest from "@/views/UnreadRequests.vue";
import pendingRequest from "@/views/PendingRequests.vue";
import approvedRequest from "@/views/ApprovedRequests.vue";
import rejectedRequest from "@/views/RejectedRequests.vue";
import Editpassword from '../modules/Kiray/Editpassword.vue'
import Signup from '../modules/Kiray/Signup.vue'
Vue.use(VueRouter);
/* eslint-disable */
const routes = [
    {
        path: "/",
        name: "login",
        component: Login
    },
    {
        path: "/signup",
        name: "signup",
        component: Signup
    },
    {
        path: "/educator",
        component: Educator,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/student/:batchnum",
        component: Student,
        name: "student",
        props: true,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/mostlyrequested",
        name: "mostly",
        component: Mostly,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/stamp",
        name: "stamp",
        component: Stamp,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/requests",
        component: Requests,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/unread-request",
        name: "unread",
        component: unreadRequest,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/pending-request",
        name: "pending",
        component: pendingRequest,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/approved-request",
        name: "approved",
        component: approvedRequest,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/rejected-request",
        name: "rejected",
        component: rejectedRequest,
        beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                next();
            } else {
                next("/");
            }
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/editpassword",
        name: "editpassword",
        component: Editpassword
    },
    {
        path: '/socket',
        component: Sockets
    },
    {
        path: '*',
        name: "notfound",
        component: Notfound
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(route => route.meta.requiresAuth)) {
//         if (store.getters.isLoggedIn) {
//             next();
//         } else {
//             next({ path: "/" });
//         }
//     }
//     next();
// });

export default router;