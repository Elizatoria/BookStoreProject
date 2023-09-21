import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div>
      <NavLink to="/bookshelf">
        My Bookshelf
      </NavLink>
      </div>

      <div>
      <NavLink to="/search">
        Search Books
      </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;