import { createRouter, createWebHistory } from 'vue-router'
import InventoryPage from '@/pages/InventoryPage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inventory',
      component: InventoryPage
    }
  ]
})

export default router
