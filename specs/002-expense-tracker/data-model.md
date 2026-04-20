# Data Model: Expense Tracker

**Feature**: Expense Tracker  
**Date**: 2026-04-15  

## Entities

### Expense
Represents a financial transaction with the following attributes:

- **id**: INTEGER PRIMARY KEY AUTOINCREMENT (unique identifier)
- **amount**: REAL NOT NULL (expense amount, must be positive)
- **date**: TEXT NOT NULL (ISO date string YYYY-MM-DD)
- **category**: TEXT NOT NULL (expense category, e.g., "Food", "Transportation")
- **payment_method**: TEXT NOT NULL (payment method, e.g., "Credit Card", "Cash")

## Validation Rules

- Amount must be greater than 0
- Date must be a valid date in the past or present (no future dates)
- Category and payment_method cannot be empty strings
- All fields are required

## Relationships

None (single entity system)

## Database Schema

```sql
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL CHECK (amount > 0),
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    payment_method TEXT NOT NULL
);

CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_payment_method ON expenses(payment_method);
```

## State Transitions

No state transitions (simple CRUD operations)