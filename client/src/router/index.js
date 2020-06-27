import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import AddProduct from '../views/AddProduct.vue';
import EditProduct from '../views/EditProduct.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login', // kalau udah login lngs ke
    name: 'Login',
    component: Login,
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/edit-product/:id', // kalo modal ga perlu bikin path
    name: 'EditProduct',
    component: EditProduct,
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

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.token) next({ name: 'Login' });
  else if (to.path == '/login' && localStorage.token) next({ name: 'Dashboard' })
  else next();
});

export default router;
