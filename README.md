# Redis URL Shortener

A full-stack URL shortening service built with Node.js backend, Next.js frontend, and Redis for data storage.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ 
- npm or yarn

## 🐳 Docker Setup (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <your-repo-url>
cd redis-url-shortener

# Start all services
docker compose up -d

# The application will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# Redis: localhost:6379
```

To stop the services:
```bash
docker compose down
```

## 🔧 Manual Setup

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start the development server
npm run start
```

The backend will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`


## 📁 Project Structure

```
redis-url-shortener/
├── backend/                 # Node.js API server
│   ├── src/
│   │   └── index.js        # Main server file
│   └── package.json
├── frontend/                # Next.js frontend
│   ├── src/
│   │   └── app/            # Next.js app directory
│   └── package.json
├── docker-compose.yml       # Docker services configuration
└── README.md
```

## 🔌 API Endpoints

- `POST /api/shorten` - Create a short URL
- `GET /:shortCode` - Redirect to original URL
- `GET /api/urls` - List all URLs (optional)

## 📚 Postman Collection

<details>
<summary>📋 Click to expand Postman Collection</summary>

```json
{
	"info": {
		"_postman_id": "4826290d-8391-45d0-aa47-1e6fff7d0469",
		"name": "redis-url-shortener",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "7016604"
	},
	"item": [
		{
			"name": "Short URL Success",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3001/QaWJIuY",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"QaWJIuY"
					]
				}
			},
			"response": []
		},
		{
			"name": "Retrieve All Pairs",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3001/",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "Create URL",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"longURL\": \"https://www.youtube.com/watch?v=DGt2_mTY2wk\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3001/create",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"create"
					]
				}
			},
			"response": []
		}
	]
}
```

</details>

Import it in your postman or use API Endpoints given above
