import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero-layout">
      <div className="card hero-card">
        <span className="hero-badge">Full Stack Product Portal</span>
        <h2>Manage your catalog with a fast and simple workflow</h2>
        <p>
          Track products, add new inventory, and remove outdated entries through a responsive UI connected
          to your Express API.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">
            View Products
          </Link>
          <Link to="/add-product" className="btn btn-secondary">
            Add Product
          </Link>
        </div>
      </div>

      <div className="hero-stats">
        <article className="card stat-card">
          <h3>Products API</h3>
          <p>GET, POST, DELETE with live updates</p>
        </article>
        <article className="card stat-card">
          <h3>Responsive UI</h3>
          <p>Optimized for desktop and mobile screens</p>
        </article>
        <article className="card stat-card">
          <h3>Docker Ready</h3>
          <p>Frontend and backend containerized</p>
        </article>
      </div>

      <div className="card spotlight-card">
        <p className="spotlight-label">Why this UI works</p>
        <h3>Fast workflow for product teams</h3>
        <p>
          Every page focuses on one action, so adding or reviewing inventory takes less time and fewer
          clicks.
        </p>
      </div>
    </section>
  );
}

export default Home;
