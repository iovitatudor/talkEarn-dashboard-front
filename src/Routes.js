import Vue from 'vue';
import Router from 'vue-router';

import AuthGuard from './guards/authGuard';
import GuestGuard from './guards/guestGuard';
import AdministratorGuard from './guards/administratorGuard';
import Layout from './components/Layout/Layout';
import Experts from './pages/Experts/Experts';
import Categories from './pages/Categories/Categories';
import Parameters from './pages/Parameters/Parameters';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ErrorPage from './pages/Error/Error';
import EditCategory from './pages/Categories/EditCategory';
import EditParameter from './pages/Parameters/EditParameter';
import EditExpert from './pages/Experts/EditExpert';
import Users from './pages/Users/Users';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: GuestGuard,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: GuestGuard,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/dashboard',
      name: 'Layout',
      component: Layout,
      beforeEnter: AuthGuard,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'experts',
          name: 'Experts',
          beforeEnter: AdministratorGuard,
          component: Experts,
        },
        {
          path: 'experts/edit/:id',
          name: 'EditExpert',
          component: EditExpert,
        },
        {
          path: 'categories',
          name: 'Categories',
          beforeEnter: AdministratorGuard,
          component: Categories,
        },
        {
          path: 'categories/edit/:id',
          name: 'EditCategory',
          beforeEnter: AdministratorGuard,
          component: EditCategory,
        },
        {
          path: 'parameters',
          name: 'Parameters',
          beforeEnter: AdministratorGuard,
          component: Parameters,
        },
        {
          path: 'parameters/edit/:id',
          name: 'EditParameter',
          beforeEnter: AdministratorGuard,
          component: EditParameter,
        },
        {
          path: 'users',
          name: 'Users',
          component: Users,
        },
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    }
  ],
});
