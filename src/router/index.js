import { createRouter, createWebHistory } from 'vue-router'
import MicroOndas from '../views/MicroOndas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'micro-ondas',
      component: MicroOndas
    }
  ]
})

export default router
