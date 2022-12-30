import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Typography from '@/pages/Typography/Typography';
import Tables from '@/pages/Tables/Tables';
import Notifications from '@/pages/Notifications/Notifications';
import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';
import Experts from '@/pages/Experts/Experts';
import Categories from '@/pages/Categories/Categories';
import Parameters from '@/pages/Parameters/Parameters';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import ErrorPage from '@/pages/Error/Error';
import AuthGuard from "./guards/authGuard";
import GuestGuard from "./guards/guestGuard";
import EditCategory from "./pages/Categories/EditCategory";
import EditParameter from "./pages/Parameters/EditParameter";
import EditExpert from "./pages/Experts/EditExpert";

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
          component: Categories,
        },
        {
          path: 'categories/edit/:id',
          name: 'EditCategory',
          component: EditCategory,
        },
        {
          path: 'parameters',
          name: 'Parameters',
          component: Parameters,
        },
        {
          path: 'parameters/edit/:id',
          name: 'EditParameter',
          component: EditParameter,
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
        },
        {
          path: 'tables',
          name: 'Typography',
          component: Tables,
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications,
        },
        {
          path: 'components/icons',
          name: 'Icons',
          component: Icons,
        },
        {
          path: 'components/maps',
          name: 'Maps',
          component: Maps,
        },
        {
          path: 'components/charts',
          name: 'Charts',
          component: Charts,
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
