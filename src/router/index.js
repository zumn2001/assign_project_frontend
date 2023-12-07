import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '../layout/AdminDashboard.vue'
import CategoryPage from '../pages/admin/CategoryPage.vue'
import ItemPage from '../pages/admin/ItemPage.vue'
import Login from '../pages/auth/Login.vue'

import axios from 'axios'
import JWTService from '../services/JWTService'
import { useUserStore } from '../stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
    {
      path : '/login',
      name : Login,
      component : Login
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta : {
        middleware : "auth"
      },
      children : [
        {
          path : 'categories',
          name : 'CategoryPage',
          component : CategoryPage
        },
        {
          path : 'items',
          name : 'ItemPage',
          component : ItemPage
        }
      ]
    },

  ]
})

router.beforeEach((to , from , next) => {
  if (to.meta.middleware == 'auth') {
    let token = JWTService.getToken();
    if (token) {
      next()
    } else {
      JWTService.destroyToken();
      window.location.assign('/login');
    }
  }  else {
    let token = JWTService.getToken();
    if (token) {
      let userStore = useUserStore();
      let config = { headers : {'Authorization' : `Bearer ${token}`} };
      axios.get('http://localhost:8000/api/user' , config).then((response) => {
        userStore.setUser(response.data);
      }).catch((response) => {
        console.log(response);
      })
    }
    next()

  }
})
export default router
