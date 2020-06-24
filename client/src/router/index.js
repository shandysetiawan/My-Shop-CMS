import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import AddProduct from '../views/AddProduct.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/edit-product',
    name: 'EditProduct',
    component: AddProduct,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.path !== 'Login' && !localStorage.token) next({ name: 'Login' })
//   else next()
// })

export default router;
