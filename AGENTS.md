# Agent Instructions for LIS Project

## Coding Standards

### Go Core API
- **Clean Architecture:** Keep business logic in `internal/usecase` and data access in `internal/repository`.
- **Concurrency:** Leverage Go routines for non-blocking I/O operations where appropriate.
- **Security:** Always use the `auth` package for JWT validation.

### Python Data Processor
- **ML Pipeline:** Maintain the train-test split logic in `main.py` to prevent data leakage.
- **Messaging:** Ensure the Kafka consumer groups are unique to this service.

### Next.js Frontend
- **Responsiveness:** Always provide both a Desktop (Table) and Mobile (Card) view for data-heavy pages.
- **UI Consistency:** Use Lucide icons and the `bg-[#F9FAFB]` base theme.
- **Performance:** Use client-side components for interactivity and Tailwind for rapid styling.

## Verification
Run the Playwright verification script in `/home/jules/verification/verify_lis_final.py` to ensure UI responsiveness hasn't regressed.
