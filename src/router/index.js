import Vue from 'vue'
import VueRouter from 'vue-router'
import Logup from '../views/logupView.vue'
import Login from '../views/loginView.vue'
import HomeView from '../views/HomeView.vue'
import PerfilComponent from '../components/PerfilComponent.vue'
import friendsComponent from '../components/FriendsComponent.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/logup',
    name: 'logup',
    component: Logup
  },
  {
    path: '/login',
    name: 'logup',
    component: Login
  },
  {
    path: '/Perfil',
    name: 'perfilComponent',
    component: PerfilComponent
  },

  {
    path: '/friendsComponent',
    name: 'friendsComponent',
    component: friendsComponent
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
