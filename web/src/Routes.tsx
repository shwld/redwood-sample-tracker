// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import ProjectLayout from './layouts/ProjectLayout/ProjectLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/" page={HomePage} name="home" />
      <Set unauthenticated="/login">
        <Route path="/projects/new" page={ProjectNewProjectPage} name="newProject" />
        <Route path="/projects/{id}/edit" page={ProjectEditProjectPage} name="editProject" />
        <Route path="/projects/{id}" page={ProjectProjectPage} name="project" />
        <Route path="/projects" page={ProjectProjectsPage} name="projects" />
        <Route path="/accounts/new" page={AccountNewAccountPage} name="newAccount" />
        <Route path="/accounts/{id}/edit" page={AccountEditAccountPage} name="editAccount" />
        <Route path="/accounts/{id}" page={AccountAccountPage} name="account" />
        <Route path="/accounts" page={AccountAccountsPage} name="accounts" />

        <Set wrap={ProjectLayout} unauthenticated="login">
          <Route path="/projects/{id}/stories" page={StoriesPage} name="stories" />
        </Set>

        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
