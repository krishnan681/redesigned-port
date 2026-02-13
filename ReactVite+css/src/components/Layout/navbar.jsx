import { Link, NavLink } from "react-router-dom";
import "../../CSS/navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-wrapper">

      {/* Logo outside the glass bar */}
      <Link to="/" className="nav-logo-left">
        MyApp
      </Link>

      {/* Centered Glass Navigation */}
      <div className="glass-nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
      </div>
      
    </nav>
  );
};

export default Navbar;
