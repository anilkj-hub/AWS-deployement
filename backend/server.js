const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 899.99, category: "Electronics" },
  { id: 2, name: "Office Chair", price: 149.99, category: "Furniture" }
];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/products", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Product name is required." });
  }

  const parsedPrice = Number(price);
  if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ error: "Valid product price is required." });
  }

  const newProduct = {
    id: Date.now(),
    name: name.trim(),
    price: Number(parsedPrice.toFixed(2)),
    category: category && String(category).trim() ? String(category).trim() : "General"
  };

  products.unshift(newProduct);
  return res.status(201).json(newProduct);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found." });
  }

  products.splice(index, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
