import { NavLink } from "react-router-dom";
import "../NavBar/NavBar.css";

function NavBar() {
  return (
    <nav>
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