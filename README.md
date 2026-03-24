# Laboratory Information System (LIS) - End-to-End Solution

A high-performance, cryptographically secure, and AI-enhanced Laboratory Information System built with a polyglot microservices architecture.

## 🚀 Architecture Overview

- **Core API (Go):** High-concurrency Gin-based API implementing Clean Architecture. Handles RBAC, patient/sample lifecycles, and cryptographic result signing (SHA256).
- **Data Processor (Python):** AI-powered service using Scikit-Learn (RandomForest) to detect clinical anomalies in real-time.
- **Frontend (Next.js):** Professional, high-fidelity dashboard built with Tailwind CSS. Fully responsive with mobile-first card-based layouts and desktop-optimized data tables.
- **Persistence (PostgreSQL):** Hosted on Neon with a strict relational schema and unique indexing for medical record integrity.
- **Messaging (Kafka):** Event-driven backbone for asynchronous status updates and AI processing triggers.
- **Orchestration (Docker):** Fully containerized development and deployment environment.

## ✨ Key Features

- **End-to-End Sample Lifecycle:** From registration and collection to automated AI validation and final cryptographic signing.
- **Cryptographic Integrity:** Every laboratory result is hashed (SHA256) upon validation. Verification is possible via a public QR verification endpoint.
- **AI Anomaly Detection:** Real-time analysis of clinical values against historical trends to flag potentially critical results.
- **Immutable Audit Trail:** Complete ledger of all system activity for compliance and forensic investigation.
- **High Fidelity UI/UX:** Responsive design with modern visualizations, floating action buttons (mobile), and complex data grids (desktop).

## 🛠️ Tech Stack

- **Backend:** Go (Gin, pgx, segmentio/kafka-go), Python (Scikit-learn, kafka-python)
- **Frontend:** Next.js 15, Tailwind CSS, Lucide Icons
- **Database:** PostgreSQL (Neon)
- **Infrastructure:** Kafka, Docker Compose

## 🚦 Getting Started

1. **Environment Setup:** Ensure `.env` contains your `DATABASE_URL` and `JWT_SECRET`.
2. **Launch Services:**
   ```bash
   docker-compose up --build
   ```
3. **Access Dashboard:** Open `http://localhost:3000`
