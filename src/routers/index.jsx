import Detail from '../pages/detail'
import Favorite from '../pages/favorite'
import Home from '../pages/home'
import Login from '../pages/login'
import Search from '../pages/search'
import User from '../pages/user'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/user', component: User },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/detail', component: Detail },
  { path: '/favorite', component: Favorite, layout: null },
]
export { publicRoutes }
