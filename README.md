Product Data Explorer

A full-stack web application that scrapes, stores, and explores book data from World of Books using a clean, production-grade architecture.

This project demonstrates real-world backend scraping pipelines, API design, and a modern Next.js (App Router) frontend, with careful attention to caching, stability, and deployment best practices.

Live Deployment

Frontend (Railway)
https://frontend-production-cfb0.up.railway.app

Backend (Railway)
https://product-data-explorer-production-cb01.up.railway.app

Project Overview

The application follows a real e-commerce style data flow:

Navigation → Categories → Products → Product Detail

What the app does

Scrapes navigation headings, categories, and products from World of Books

Stores structured data in PostgreSQL

Exposes data via RESTful APIs

Displays data using a modern Next.js App Router frontend

Uses caching and TTL-based refresh to avoid unnecessary re-scraping

Tech Stack
Backend

Node.js

NestJS

TypeScript (strict)

Prisma ORM

PostgreSQL

Crawlee + Playwright (scraping)

Why PostgreSQL?
PostgreSQL was chosen for its strong relational guarantees, indexing support, and suitability for structured scraped data with clear relationships.

Frontend

Next.js 16 (App Router)

TypeScript

Tailwind CSS

Server Components + Fetch API

Project Structure
product-data-explorer/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── navigation/
│   │   │   ├── category/
│   │   │   └── product/
│   │   └── scraper/
│   │       ├── navigation.scraper.ts
│   │       ├── category.scraper.ts
│   │       ├── product.scraper.ts
│   │       └── product-detail.scraper.ts
│   └── .env (local only)
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx
│       │   ├── categories/[navigationId]/page.tsx
│       │   ├── products/page.tsx
│       │   └── products/[productId]/page.tsx
│       ├── lib/api.ts
│       └── types/index.ts
│
└── README.md

Backend API Endpoints
Method	Endpoint	Description
GET	/api/navigation	Fetch navigation headings
GET	/api/categories/:navigationId	Fetch categories
GET	/api/products?categoryId=XYZ	Fetch products
GET	/api/products/:id	Fetch product with detail


Scraping Architecture (Important)
Local Development

Crawlers enabled

Data scraped live from World of Books

Cached using lastScrapedAt (TTL = 24h)

On-demand scraping supported

Railway Deployment (Production)

Crawlers are disabled in the web container

Backend serves only cached data from the database

Scraping is intended to run via controlled background or offline execution against the same database

This avoids:

Timeouts

Rate limiting

Ethical/legal scraping risks

Production instability

This mirrors real-world production systems where scraping pipelines are decoupled from user traffic.

Data Strategy

Grid pages (categories / products) are optimized for discovery

Product detail pages are authoritative

Missing prices or images in grids are allowed

Product detail enrichment happens separately

This design is intentional and industry-standard.


Frontend Highlights


Next.js App Router–based routing

Card-based UI for navigation, categories, and products

Loading skeletons for better UX

Graceful handling of missing data

Responsive, mobile-first layout

Structure aligned directly with backend hierarchy

Environment Variables

Backend (local only)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB


.env is not committed

.env.example is provided

Frontend (Railway)
NEXT_PUBLIC_API_URL=https://product-data-explorer-production-cb01.up.railway.app

Running Locally

Backend
cd backend
npm install
npm run build
npm run start


Ensure a valid DATABASE_URL is present in .env.

Frontend
cd frontend
npm install
npm run dev

Known Limitations (Documented)

Product grid pagination not implemented (intentional)

Prices may be 0 on grid pages

Images may be missing

Crawlers disabled in production web container

All of the above are documented design choices, not bugs.

Author
Sourabh


Project built with a focus on learning, correctness, and production realism.
