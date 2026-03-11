import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="card hero-card">
      <h2>Manage Your Product Catalog</h2>
      <p>
        Add, list, and remove products from a clean dashboard connected to a Node.js and Express backend
        API.
      </p>
      <div className="hero-actions">
        <Link to="/products" className="btn btn-primary">
          View Products
        </Link>
        <Link to="/add-product" className="btn btn-secondary">
          Add Product
        </Link>
      </div>
    </section>
  );
}

export default Home;
