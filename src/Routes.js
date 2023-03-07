import Vue from 'vue';
import Router from 'vue-router';

import AuthGuard from './guards/authGuard';
import GuestGuard from './guards/guestGuard';
import AdministratorGuard from './guards/administratorGuard';
import Layout from './components/Layout/Layout';
import Experts from './pages/Experts/Experts';
import Categories from './pages/Categories/Categories';
import Collections from './pages/Collections/Collections';
import Parameters from './pages/Parameters/Parameters';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ErrorPage from './pages/Error/Error';
import EditCategory from './pages/Categories/EditCategory';
import EditCollection from './pages/Collections/EditCollection';
import EditParameter from './pages/Parameters/EditParameter';
import EditExpert from './pages/Experts/EditExpert';
import AssignedClients from './pages/Clients/AssignedClients';
import NotAssignedClients from './pages/Clients/NotAssignedClients';
import EditClient from './pages/Clients/EditClient';
import Schedule from "./pages/Schedule/Schedule";
import Language from "./pages/Languages/Languages";
import EditLanguage from './pages/Languages/EditLanguage';
import MyExperts from "./pages/MyExperts/MyExperts";
import MySupervisors from "./pages/MySupervisors/MySupervisors";
import MySupervisee from "./pages/MySupervisee/MySupervisee";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: GuestGuard,
    },
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
          path: 'collections',
          name: 'Collections',
          beforeEnter: AdministratorGuard,
          component: Collections,
        },
        {
          path: 'Collections/edit/:id',
          name: 'EditCollection',
          beforeEnter: AdministratorGuard,
          component: EditCollection,
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
          path: 'not-assigned-clients',
          name: 'Not assigned clients',
          component: NotAssignedClients,
        },
        {
          path: 'assigned-clients',
          name: 'Assigned clients',
          component: AssignedClients,
        },
        {
          path: 'clients/edit/:id',
          name: 'EditClient',
          component: EditClient,
        },
        {
          path: 'schedule',
          name: 'Schedule',
          component: Schedule,
        },
        {
          path: 'languages',
          name: 'Language',
          component: Language,
        },
        {
          path: 'languages/edit/:id',
          name: 'EditLanguage',
          component: EditLanguage,
        },
        {
          path: 'my-experts',
          name: 'MyExperts',
          component: MyExperts,
        },
        {
          path: 'my-supervisors',
          name: 'MySupervisors',
          component: MySupervisors,
        },
        {
          path: 'my-supervisee',
          name: 'MySupervisee',
          component: MySupervisee,
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
