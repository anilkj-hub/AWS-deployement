import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <div className="container nav-content">
        <h1 className="logo">Product Manager</h1>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
            Products
          </NavLink>
          <NavLink to="/add-product" className={({ isActive }) => (isActive ? "active" : "")}>
            Add Product
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
