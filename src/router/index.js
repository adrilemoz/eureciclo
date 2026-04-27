import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Início' }
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('@/views/CalculatorView.vue'),
    meta: { title: 'Calculadora' }
  },
  {
    path: '/sales',
    name: 'sales',
    component: () => import('@/views/SalesView.vue'),
    meta: { title: 'Vendas' }
  },
  {
    path: '/materials',
    name: 'materials',
    component: () => import('@/views/MaterialsView.vue'),
    meta: { title: 'Materiais' }
  },
  {
    path: '/materials/add',
    name: 'materials-add',
    component: () => import('@/views/AddEditMaterialView.vue'),
    meta: { title: 'Novo Material', mode: 'add' }
  },
  {
    path: '/materials/:id/edit',
    name: 'materials-edit',
    component: () => import('@/views/AddEditMaterialView.vue'),
    meta: { title: 'Editar Material', mode: 'edit' }
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('@/views/SobreView.vue'),
    meta: { title: 'Sobre' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
