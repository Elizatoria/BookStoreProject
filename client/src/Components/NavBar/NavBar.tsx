import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="top">
      <NavLink to="/bookshelf">
        My Bookshelf
      </NavLink>
      </div>

      <div className="top">
      <NavLink to="/search">
        Search Books
      </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;