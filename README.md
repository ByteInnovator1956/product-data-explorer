<a id="top"></a>

<h1 align="center">Product Data Explorer</h1> <p align="center"> Production-grade scraping & data exploration platform built with NestJS + Next.js </p> <p align="center"> <img src="https://img.shields.io/badge/Node.js-18+-green" /> <img src="https://img.shields.io/badge/TypeScript-Strict-blue" /> <img src="https://img.shields.io/badge/Framework-NestJS-red" /> <img src="https://img.shields.io/badge/Frontend-Next.js-black" /> <img src="https://img.shields.io/badge/Status-Production-success" /> </p>
Table of Contents

Live Deployment

Project Overview

Tech Stack

Project Structure

API Endpoints

Scraping Architecture

Data Strategy

Frontend Highlights

Environment Variables

Known Limitations

Roadmap

Why This Project Matters

Author

Live Deployment

Frontend (Railway)
https://frontend-production-cfb0.up.railway.app

Backend (Railway)
https://product-data-explorer-production-cb01.up.railway.app

<p align="right"><a href="#top">Back to top</a></p>
Project Overview

Real-world e-commerce style data flow:

Navigation → Categories → Products → Product Detail

Features

Scrapes navigation, categories, and products from World of Books

Stores structured data in PostgreSQL

REST API using NestJS

Modern Next.js frontend

Intelligent caching (TTL based)

Production-safe scraping strategy

<p align="right"><a href="#top">Back to top</a></p>
Tech Stack
Backend

Node.js

NestJS

TypeScript (strict)

Prisma ORM

PostgreSQL

Crawlee + Playwright

Frontend

Next.js 16 (App Router)

TypeScript

Tailwind CSS

Server Components

Fetch API

<p align="right"><a href="#top">Back to top</a></p>
Project Structure
<details> <summary><strong>Click to expand</strong></summary>
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

</details> <p align="right"><a href="#top">Back to top</a></p>
Backend API Endpoints
Method	Endpoint	Description
GET	/api/navigation	Fetch navigation
GET	/api/categories/:navigationId	Fetch categories
GET	/api/products?categoryId=XYZ	Fetch products
GET	/api/products/:id	Fetch product details

Example response:

{
  "id": 2,
  "title": "The Trial",
  "price": 0,
  "currency": "GBP"
}

<p align="right"><a href="#top">Back to top</a></p>
Scraping Architecture
Local Development

Crawlers enabled

Live scraping

Cached using lastScrapedAt (24h TTL)

Railway (Production)

IMPORTANT
Crawlers are DISABLED in production
Backend serves cached DB data only

This prevents:

Timeouts

Rate limits

Legal issues

Production crashes

This mirrors real industry pipelines where scraping runs via background jobs.

<p align="right"><a href="#top">Back to top</a></p>
Data Strategy

Grid pages → discovery

Detail pages → source of truth

Missing prices/images allowed

Data enriched over time

Industry-standard design.

Frontend Highlights

App Router navigation

Skeleton loaders

Responsive layout

Card-based UI

Graceful fallback for missing data

Clean folder structure

Environment Variables
Backend
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB


.env NOT committed

.env.example included

Frontend
NEXT_PUBLIC_API_URL=https://<backend-service>.up.railway.app

Known Limitations

No pagination (intentional)

Price may be 0

Images may be missing

Crawlers disabled in prod

These are design choices, not bugs.

Roadmap

 Scraping pipeline

 Caching system

 Production deployment

 Pagination

 Admin dashboard

 Search feature

Why This Project Matters

Demonstrates:

Real scraping architecture

Safe production practices

Scalable backend design

Clean frontend architecture

Attention to UX and stability

Author

Sourabh
Backend + Frontend Developer

Built with focus on learning, correctness & production realism.

<p align="center"> <a href="#top">Back to top</a> </p>
