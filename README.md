# LIS - Laboratory Information System

A high-performance, scalable Laboratory Information System (LIS) built with Go, Python, and Next.js.

## Architecture

- **Backend (Go)**: Core API (high concurrency, low latency)
- **Backend (Python)**: Data processing and lab tool integration
- **Frontend (Next.js)**: Internal dashboard (SSR)
- **Database**: PostgreSQL (relational integrity)
- **Messaging**: Kafka (event streaming), RabbitMQ (task queue)
- **Containerization**: Docker

## Modules

1. **Auth Service**: Authentication and RBAC
2. **Patient Service**: Patient CRUD and search
3. **Sample Service**: Sample registration and tracking
4. **Test Processing Service**: Lab test results input/automation
5. **Result Validation Service**: Multi-level validation and digital signature
6. **QR Verification Service**: Public result verification
7. **Reporting Service**: Exportable reports (PDF/Excel)
8. **Audit Log Service**: Immutable activity logs
