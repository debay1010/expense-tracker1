# Expense Tracker

A web-based application for tracking personal expenses with visual summaries and kanban board organization.

## Features

- **Record Expenses**: Add expenses with amount, date, category, and payment method
- **Filter Expenses**: Filter by date range, category, and amount
- **Visual Summaries**: View expense data through charts and graphs
- **Kanban Board**: Organize expenses into To-Do, Done, and Archived columns with drag-and-drop functionality

## Technologies

- JavaScript (ES6+)
- Vite (build tool)
- sql.js (SQLite in browser)
- Chart.js (visualizations)
- SortableJS (drag-and-drop)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Usage

- Use the "Add Expense" form to record new expenses
- Switch between List View, Kanban Board, and Charts views using the navigation buttons
- In Kanban Board, drag expenses between columns to change their status
- Apply filters to narrow down expenses in any view

## Kanban Board

The kanban board helps organize expense processing workflow:
- **To-Do**: Expenses that need attention or categorization
- **Done**: Processed or completed expenses
- **Archived**: Old or finalized expenses

Drag and drop expenses between columns to update their status. Changes are automatically saved to the local database.