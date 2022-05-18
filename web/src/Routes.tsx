// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import AccountsLayout from 'src/layouts/AccountsLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/home" page={HomePage} name="home" />
      <Set wrap={AccountsLayout}>
        <Route path="/accounts/new" page={AccountNewAccountPage} name="newAccount" />
        <Route path="/accounts/{id}/edit" page={AccountEditAccountPage} name="editAccount" />
        <Route path="/accounts/{id}" page={AccountAccountPage} name="account" />
        <Route path="/accounts" page={AccountAccountsPage} name="accounts" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
