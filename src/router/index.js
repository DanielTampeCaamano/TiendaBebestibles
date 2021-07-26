import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () => import('@/views/Home'),
  },
  {
    path: '/carrito',
    name: 'Carrito',
    meta: { requiresAuth: true },
    component: () => import('@/views/Carrito')
  },
  {
    path: '/mezclador',
    name: 'Mezclador',
    meta: { requiresAuth: true },
    component: () => import('@/views/Mezclador')
  },
  {
    path: '/ingredientes',
    name: 'Ingredientes',
    meta: { requiresAuth: true },
    component: () => import('@/views/Ingredientes')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/Auth/LoginPage')
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/Auth/RegisterPage')
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/Auth/ForgotPassword')
  },
  {
    path: '/auth/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/Auth/ResetPassword')
  },
  {
    path: '/auth/verify-email',
    name: 'VerifyEmail',
    component: () => import('@/views/Auth/VerifyEmail')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin/AdminLayout'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (store.getters.isAdmin) next()
      else next('/profile')
    },
    children: [
      {
        path: 'users',
        name: 'UsersPage',
        component: () => import('@/views/Admin/UsersPage'),
      }
    ]
  },
  {
    path: '*',
    redirect: '/auth/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // La ruta requiere autentificación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Continuamos con la navegación si el usuario esta autentificado
    if (store.getters.isAuthenticated) next();
    // En caso contrario lo enviamos al Login
    else next({ name: 'Login' });
  } else {
    // Evitamos que un usuario logeado ingrese a alguna vista con el path auth
    if (store.getters.isAuthenticated && to.path.includes('auth')) {
      // En caso de ser así enviamos al usuario al Home
      next({ name: 'Home' });
    }
    else next();
  }
});

export default router