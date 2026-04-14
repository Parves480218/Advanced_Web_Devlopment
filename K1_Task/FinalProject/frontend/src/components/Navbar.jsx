import { NavLink } from 'react-router-dom'

function Navbar() {
  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'text-[#00BFA6] font-medium transition'
      : 'text-white hover:text-[#00BFA6] font-medium transition'

  return (
    <header className="bg-[#004E89] fixed w-full z-50 shadow">
      <div className="max-w-7xl mx-auto px-8 py-4 grid grid-cols-2 items-center">
        <NavLink to="/" className="text-2xl font-extrabold text-white">
          PaddleJoy
        </NavLink>

        <nav className="justify-self-end flex flex-wrap gap-3 sm:gap-6 text-sm sm:text-base">
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