import Vue from 'vue';
import VueRouter from 'vue-router';
import NewCalendar from '@/views/NewCalendar.vue';
import Calendars from '../views/Calendars.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Calendars',
    component: Calendars,
  },
  {
    path: '/new-calendar',
    name: 'NewCalendar',
    component: NewCalendar,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
