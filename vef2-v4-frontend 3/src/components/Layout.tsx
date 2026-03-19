import { Link, NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            Fréttavefurinn
          </Link>

          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              end
            >
              Forsíða
            </NavLink>
            <NavLink
              to="/ny-frett"
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              Ný frétt
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">Vefforritun 2 – verkefni 4</div>
      </footer>
    </div>
  );
}
