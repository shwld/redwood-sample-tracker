import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ProjectLayoutProps = {
  children: React.ReactNode
}

const ProjectsLayout = ({ children }: ProjectLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.projects()}
            className="rw-link"
          >
            Projects
          </Link>
        </h1>
        <Link
          to={routes.newProject()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Project
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ProjectsLayout
