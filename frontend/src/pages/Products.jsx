import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await deleteProduct(id);
      setProducts((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <h2 className="section-title">Products</h2>
          <p className="section-subtitle">Live inventory list from backend API</p>
        </div>
        <button className="btn btn-secondary" onClick={loadProducts} type="button">
          Refresh
        </button>
      </div>

      {error && <p className="message error">{error}</p>}
      {loading && <p className="message">Loading products...</p>}

      {!loading && products.length === 0 && <p className="message">No products found.</p>}

      {!loading && products.length > 0 && (
        <div className="overview-grid">
          <article className="card overview-card">
            <p>Total Products</p>
            <strong>{products.length}</strong>
          </article>
          <article className="card overview-card">
            <p>Total Inventory Value</p>
            <strong>
              $
              {products
                .reduce((sum, item) => sum + Number(item.price || 0), 0)
                .toFixed(2)}
            </strong>
          </article>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="table-wrapper card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <span className="category-pill">{product.category}</span>
                  </td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Products;
