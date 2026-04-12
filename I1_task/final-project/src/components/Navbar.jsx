import { NavLink } from 'react-router-dom'

function Navbar() {
  const getLinkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link'

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="brand">PaddleJoy</div>

        <nav className="nav-menu">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/form" className={getLinkClass}>
            Booking Form
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar