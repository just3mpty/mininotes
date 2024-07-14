import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/components/auth/LoginVue.vue'
import NotesPage from '@/views/NotesPage.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { AUTH } from '@/firebaseConfig'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginVue
  },
  {
    path: '/notes',
    name: 'Notes',
    component: NotesPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  onAuthStateChanged(AUTH, (user) => {
    if (requiresAuth && !user) {
      next('/')
    } else if (!requiresAuth && user) {
      next('/notes')
    } else {
      next()
    }
  })
})

export default router
