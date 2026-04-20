# Research Findings: Expense Tracker

**Feature**: Expense Tracker  
**Date**: 2026-04-15  
**Researcher**: AI Assistant  

## Decisions and Rationale

### Testing Framework
**Decision**: Use Vitest for unit tests and Playwright for end-to-end tests.  
**Rationale**: Vitest integrates seamlessly with Vite and provides fast, reliable unit testing for JavaScript. Playwright offers robust E2E testing for web applications with cross-browser support.  
**Alternatives Considered**: Jest (slower setup, less Vite integration); Cypress (good but Playwright has better performance).

### Performance Goals
**Decision**: Page load under 2 seconds, expense operations under 1 second.  
**Rationale**: Ensures responsive user experience for a personal finance app. Page load goal accounts for SQLite initialization.  
**Alternatives Considered**: Stricter goals (500ms) rejected as unnecessary for non-critical app; looser goals rejected for UX principle.

### Constraints
**Decision**: Offline-capable via local SQLite, minimal external dependencies.  
**Rationale**: Aligns with vanilla JS preference and allows use without internet. SQLite provides full SQL capabilities in browser.  
**Alternatives Considered**: IndexedDB (rejected for SQL complexity); Cloud storage (rejected for offline requirement and complexity).

### Scale/Scope
**Decision**: Support up to 10,000 expenses with efficient querying.  
**Rationale**: Reasonable for personal use; covers years of daily expenses. Efficient indexing prevents performance issues.  
**Alternatives Considered**: Unlimited scale rejected as overkill; lower limits (1k) insufficient for long-term use.

### SQLite Integration
**Decision**: Use sql.js for browser-based SQLite.  
**Rationale**: Pure JavaScript implementation, no server required, full SQLite features.  
**Alternatives Considered**: WebSQL (deprecated); WASM SQLite (sql.js is mature).

### Charting Library
**Decision**: Use Chart.js with minimal wrapper.  
**Rationale**: Lightweight, vanilla JS compatible, comprehensive charting options.  
**Alternatives Considered**: D3.js (too heavy for minimal approach); no charts rejected for missing feature requirement.