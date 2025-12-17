import { NavLink } from "react-router-dom";
import "./App.css";  // using global navbar styles

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "nav-active" : ""}
      >
        Add Product
      </NavLink>

      <NavLink 
        to="/update" 
        className={({ isActive }) => isActive ? "nav-active" : ""}
      >
        Update
      </NavLink>

      <NavLink 
        to="/delete" 
        className={({ isActive }) => isActive ? "nav-active" : ""}
      >
        Delete
      </NavLink>

      <NavLink 
        to="/season-totals" 
        className={({ isActive }) => isActive ? "nav-active" : ""}
      >
        Season Totals
      </NavLink>

      <NavLink 
        to="/top-products" 
        className={({ isActive }) => isActive ? "nav-active" : ""}
      >
        Top Products
      </NavLink>

      <NavLink 
        to="/rating-filter" 
        className={({ isActive }) => isActive ? "nav-active" : ""}
      >
        Rating Filter
      </NavLink>
    </nav>
  );
}
