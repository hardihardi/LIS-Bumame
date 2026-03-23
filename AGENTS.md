# Development Guide

## Code Conventions
- Go: Use `internal` package for core logic. Keep `cmd` light.
- Python: Use `main.py` as entry point. Modularize as the project grows.
- Next.js: Use App Router and Tailwind CSS.

## Testing
- Go: `go test ./...`
- Python: `pytest` (if added)
- Next.js: `npm test` (if added)

## Infrastructure
- Use `docker-compose up` to start the entire environment.
- PostgreSQL schema migrations should be done through SQL statements.
