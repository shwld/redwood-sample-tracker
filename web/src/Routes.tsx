// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import ProjectsLayout from 'src/layouts/ProjectsLayout'
import AccountsLayout from 'src/layouts/AccountsLayout'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ProjectsLayout}>
        <Route path="/projects/new" page={ProjectNewProjectPage} name="newProject" />
        <Route path="/projects/{id}/edit" page={ProjectEditProjectPage} name="editProject" />
        <Route path="/projects/{id}" page={ProjectProjectPage} name="project" />
        <Route path="/projects" page={ProjectProjectsPage} name="projects" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={MainLayout} unauthenticated="login">
        <Route path="/stories" page={StoriesPage} name="stories" />
        <Set wrap={AccountsLayout}>
          <Route path="/accounts/new" page={AccountNewAccountPage} name="newAccount" />
          <Route path="/accounts/{id}/edit" page={AccountEditAccountPage} name="editAccount" />
          <Route path="/accounts/{id}" page={AccountAccountPage} name="account" />
          <Route path="/accounts" page={AccountAccountsPage} name="accounts" />
        </Set>

        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
