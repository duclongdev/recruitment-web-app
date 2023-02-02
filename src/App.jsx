import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { DefaultLayout } from './layouts'
import AdminPage from './pages/admin/admin'
import DashboardAdminPage from './pages/admin/dashboard/dashboard_admin_page'
import EmployeeAdminPage from './pages/admin/employee/employee_admin_page'
import JobsAdminPage from './pages/admin/jobs/jobs_admin_page'
import UserAdminPage from './pages/admin/user/user_admin_page'
import { publicRoutes } from './routers'

const App = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((router, index) => {
          let Layout = DefaultLayout
          if (router.layout) Layout = router.layout
          else if (router.layout === null) Layout = Fragment

          const Page = router.component
          const type = router.type ? router.type : 'user'
          return (
            <Route
              key={index}
              path={router.path}
              element={
                <Layout>
                  <Page type={type} />
                </Layout>
              }
            />
          )
        })}
        <Route element={<AdminPage />}>
          <Route path="/admin/*/" element={<DashboardAdminPage />} />
          <Route exact path="/admin/*/dashboard" element={<DashboardAdminPage />} />
          <Route exact path="/admin/*/jobs" element={<JobsAdminPage />} />
          <Route exact path="/admin/*/employee" element={<EmployeeAdminPage />} />
          <Route exact path="/admin/*/user" element={<UserAdminPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
