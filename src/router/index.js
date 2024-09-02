import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ErrorView from '@/views/ErrorView.vue'
import ChatListView from '@/views/ChatListView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/chat',
      name: 'chat-list',
      component: ChatListView,
      meta: { requiresAuth: true }
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: ChatView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: ErrorView
    }
  ]
})

router.customInjection = null
router.customInjectionHandler = (value) => {
  router.customInjection = value
}

router.beforeEach((to, from, next) => {
  const userStore = router.customInjection

  if (to.meta.requiresAuth) {
    if (!userStore.isLogin()) {
      next('/')
      return
    }
  }

  if (to.path === '/' && userStore.isLogin()) {
    next('/chat')
    return
  }

  next()
})

export default router
