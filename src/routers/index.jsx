import AdminPage from '../pages/admin/admin'
import DashboardAdminPage from '../pages/admin/dashboard/dashboard_admin_page'
import JobsAdminPage from '../pages/admin/jobs/jobs_admin_page'
import Apply from '../pages/apply/apply'
import CreateCV from '../pages/createCV'
import Detail from '../pages/detail'
import Employee from '../pages/employee'
import Favorite from '../pages/favorite'
import Home from '../pages/home'
import Login from '../pages/login'
import LoginForEmployee from '../pages/loginForEmployee'
import ManagePost from '../pages/managePost/managePost'
import ManagePostAdmin from '../pages/managePostAdmin/managePostAdmin'
import PostJob from '../pages/postJob'
import ReviewCompany from '../pages/reviewCompany'
import Search from '../pages/search'
import Signup from '../pages/signup'
import User from '../pages/user'

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
  { path: '/manage-post', component: ManagePost },
  { path: '/apply', component: Apply },
  { path: '/manage-post-admin', component: ManagePostAdmin },
]
export { publicRoutes }
