# Full Stack Product Management App

This project contains:
- `frontend`: React.js app (port `3000`)
- `backend`: Node.js + Express REST API (port `5000`)

## Features

- Home, Products, and Add Product pages
- Product CRUD (list, add, delete)
- Backend REST APIs:
  - `GET /products`
  - `POST /products`
  - `DELETE /products/:id`
- In-memory product storage
- Dockerized frontend and backend
- `docker-compose` orchestration
- GitHub Actions CI workflow

## Run Locally (without Docker)

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run with Docker Compose

```bash
docker compose up --build
```

Applications:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/products`

## API Examples

### Get all products
```bash
curl http://localhost:5000/products
```

### Add a product
```bash
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Mouse\",\"price\":29.99,\"category\":\"Electronics\"}"
```

### Delete a product
```bash
curl -X DELETE http://localhost:5000/products/1
```

## CI/CD Readiness

- Dockerfiles are available for both services.
- `docker-compose.yml` orchestrates multi-container deployment.
- `.github/workflows/ci.yml` validates dependency install and image builds on push/PR.
