import Detail from '../pages/detail'
import Favorite from '../pages/favorite'
import Home from '../pages/home'
import Login from '../pages/login'
import Search from '../pages/search'
import User from '../pages/user'
import ReviewCompany from '../pages/reviewCompany'
import LoginForEmployee from '../pages/loginForEmployee'
import CreateCV from '../pages/createCV'
import Employee from '../pages/employee'
import PostJob from '../pages/postJob'
import Signup from '../pages/signup'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/review-company', component: ReviewCompany },
  { path: '/login-employee', component: LoginForEmployee },
  { path: '/post-job', component: PostJob },
  { path: '/employee', component: Employee },
  { path: '/sign-up', component: Signup },
  { path: '/login-employ', component: Login, type: 'em' },
  { path: '/create-cv', component: CreateCV },
  { path: '/user', component: User },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/detail', component: Detail },
  { path: '/favorite', component: Favorite, layout: null },
]
export { publicRoutes }
