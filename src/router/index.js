import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/layout.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/register',
    name: 'register',
    component: () =>
        import ('../views/register/register.vue'),
    meta: {
        index: '/register',
        title: '注册'
    }
}, {
    path: '/login',
    name: 'login',
    component: () =>
        import ('../views/login/login.vue'),
    meta: {
        index: '/login',
        title: '登录'
    }
}, {

    path: '/',
    component: Layout,
    children: [{
        path: '',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页',
            index: '/'
        }
    }, {
        path: 'detail',
        name: 'detail',
        component: () =>
            import ('../views/detail/detail.vue'),
        meta: {
            title: '详情',
            index: 'detail'
        }
    }, {
        path: 'success',
        name: 'success',
        component: () =>
            import ('../views/detail/success.vue'),
        meta: {
            title: "成功加入购物车",
            index: 'success'
        }
    }, {
        path: 'search',
        name: 'search',
        component: () =>
            import ('../views/search/search.vue'),
        meta: {
            title: "搜索",
            index: 'search'
        }
    }, {
        path: 'order',
        name: 'order',
        component: () =>
            import ('../views/order/order.vue'),
        meta: {
            title: "我的订单",
            index: 'order'
        }
    }]
}, {
    path: '/cart',
    name: '/cart',
    component: () =>
        import ('../views/cart/cart.vue'),
    meta: {
        title: "我的购物车",
        index: '/cart'
    }
}, {
    path: '/settle',
    name: '/settle',
    component: () =>
        import ('../views/settle/settle.vue'),
    meta: {
        title: "填写订单信息",
        index: '/settle'
    }
}, {
    path: '*',
    name: '/404',
    component: () =>
        import ('../views/404/404.vue'),
    meta: {
        title: "小米商城",
        index: '/404'
    }
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    const user = JSON.parse(localStorage.getItem('user'))
    next()
        // if (to.path === '/login') {
        //     next()
        // } else {
        //     user ? next() : next('/login')
        // }
})

export default router