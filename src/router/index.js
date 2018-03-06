import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/components/common/login';

import Cars from '@/components/cars/cars';
import CarEdit from '@/components/cars/edit';

import Users from '@/components/users/users';
import UserEdit from '@/components/users/edit';
import UserAdd from '@/components/users/add';

import Audits from '@/components/audits/audits';
import AuditsEdit from '@/components/audits/edit';

export default new Router({
  routes: [
    { path: '/', component: Login },
    { path: '*', component: Login },
    { path: '/login', component: Login },
		
	{ path: '/cars', component: Cars },
	{ path: '/car-edit', component: CarEdit },
	
    { path: '/users', component: Users },
    { path: '/user-edit', component: UserEdit },
    { path: '/user-add', component: UserAdd },

	{ path: '/audits', component: Audits },
	{ path: '/audit-edit', component: AuditsEdit }
  ]
})
