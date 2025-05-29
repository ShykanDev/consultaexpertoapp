import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { authStore } from '@/store/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
        meta:{
          requiresAuth: false
        }
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta:{
          requiresAuth: false
        }
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta:{
          requiresAuth: false
        }
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta:{  
          requiresAuth: true
        }
      },
      {
        path: 'user-account',
        component: () => import('@/views/client/UserAccount.vue'),
        meta:{
          requiresAuth: true
        }
      },
      {
        path: 'user-account/:id',
        component: () => import('@/views/client/UserAccount.vue'),
        meta:{
          requiresAuth: true
        }
      },
      {
        path: 'experts-list',
        component: () => import('@/views/ExpertsListView.vue'),
        meta:{
          requiresAuth: true
        }
      }
    ],
    
  },
  {
    path: '/add-experts',
    component: () => import('@/views/mock/AddExpertsView.vue'),
    meta:{
      requiresAuth: true
    }
  
  },
  {
    path: '/expert-info',
    component: () => import('@/views/ExpertInfoView.vue'),
    meta:{
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStorePinia = authStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStorePinia.getIsAuth) {
      next({
        path: '/tabs/tab1'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
