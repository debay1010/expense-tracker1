// app.js
import initSqlJs from 'sql.js';
import Chart from 'chart.js/auto';
import Sortable from 'sortablejs';

// Global variables
let db;
let expenses = [];

// Initialize the application
export async function initApp() {
  try {
    // Initialize SQL.js
    const SQL = await initSqlJs();
    db = new SQL.Database();

    // Create expenses table with status column
    db.run(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        status TEXT DEFAULT 'todo'
      )
    `);

    // Load existing expenses
    loadExpenses();

    // Setup UI
    setupUI();

    // Render initial views
    renderExpenseList();
    renderKanbanBoard();
    renderCharts();

  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
}

// Database functions
function loadExpenses() {
  const result = db.exec('SELECT * FROM expenses ORDER BY date DESC');
  expenses = result.length > 0 ? result[0].values.map(row => ({
    id: row[0],
    amount: row[1],
    date: row[2],
    category: row[3],
    payment_method: row[4],
    status: row[5]
  })) : [];
}

function saveExpense(expense) {
  db.run('INSERT INTO expenses (amount, date, category, payment_method, status) VALUES (?, ?, ?, ?, ?)',
    [expense.amount, expense.date, expense.category, expense.payment_method, expense.status || 'todo']);
  loadExpenses();
}

function updateExpenseStatus(id, status) {
  db.run('UPDATE expenses SET status = ? WHERE id = ?', [status, id]);
  loadExpenses();
}

// UI functions
function setupUI() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>Expense Tracker</h1>
    </header>
    <nav>
      <button id="list-view-btn">List View</button>
      <button id="kanban-view-btn">Kanban Board</button>
      <button id="charts-view-btn">Charts</button>
    </nav>
    <main>
      <section id="expense-form">
        <h2>Add Expense</h2>
        <form id="add-expense-form">
          <input type="number" id="amount" placeholder="Amount" step="0.01" required>
          <input type="date" id="date" required>
          <input type="text" id="category" placeholder="Category" required>
          <input type="text" id="payment-method" placeholder="Payment Method" required>
          <button type="submit">Add Expense</button>
        </form>
      </section>
      <section id="filters">
        <h2>Filters</h2>
        <input type="date" id="start-date">
        <input type="date" id="end-date">
        <input type="text" id="filter-category" placeholder="Category">
        <input type="number" id="min-amount" placeholder="Min Amount">
        <input type="number" id="max-amount" placeholder="Max Amount">
        <button id="apply-filters">Apply Filters</button>
        <button id="clear-filters">Clear Filters</button>
      </section>
      <section id="views">
        <div id="list-view" class="view">
          <h2>Expenses</h2>
          <ul id="expense-list"></ul>
        </div>
        <div id="kanban-view" class="view hidden">
          <h2>Kanban Board</h2>
          <div id="kanban-board">
            <div class="kanban-column" data-status="todo">
              <h3>To-Do</h3>
              <div class="kanban-cards" id="todo-column"></div>
            </div>
            <div class="kanban-column" data-status="done">
              <h3>Done</h3>
              <div class="kanban-cards" id="done-column"></div>
            </div>
            <div class="kanban-column" data-status="archived">
              <h3>Archived</h3>
              <div class="kanban-cards" id="archived-column"></div>
            </div>
          </div>
        </div>
        <div id="charts-view" class="view hidden">
          <h2>Expense Summaries</h2>
          <canvas id="category-chart"></canvas>
          <canvas id="payment-chart"></canvas>
        </div>
      </section>
    </main>
  `;

  // Event listeners
  document.getElementById('add-expense-form').addEventListener('submit', handleAddExpense);
  document.getElementById('apply-filters').addEventListener('click', applyFilters);
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
  document.getElementById('list-view-btn').addEventListener('click', () => showView('list'));
  document.getElementById('kanban-view-btn').addEventListener('click', () => showView('kanban'));
  document.getElementById('charts-view-btn').addEventListener('click', () => showView('charts'));
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
  document.getElementById(`${viewName}-view`).classList.remove('hidden');
}

function handleAddExpense(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const expense = {
    amount: parseFloat(formData.get('amount')),
    date: formData.get('date'),
    category: formData.get('category'),
    payment_method: formData.get('payment-method'),
    status: 'todo'
  };
  saveExpense(expense);
  renderExpenseList();
  renderKanbanBoard();
  renderCharts();
  e.target.reset();
}

function applyFilters() {
  // Implementation for filters
  renderExpenseList();
  renderKanbanBoard();
  renderCharts();
}

function clearFilters() {
  document.getElementById('start-date').value = '';
  document.getElementById('end-date').value = '';
  document.getElementById('filter-category').value = '';
  document.getElementById('min-amount').value = '';
  document.getElementById('max-amount').value = '';
  applyFilters();
}

function renderExpenseList() {
  const list = document.getElementById('expense-list');
  list.innerHTML = expenses.map(expense => `
    <li>
      $${expense.amount} - ${expense.category} - ${expense.date} - ${expense.payment_method} - ${expense.status}
    </li>
  `).join('');
}

function renderKanbanBoard() {
  const todoColumn = document.getElementById('todo-column');
  const doneColumn = document.getElementById('done-column');
  const archivedColumn = document.getElementById('archived-column');

  todoColumn.innerHTML = '';
  doneColumn.innerHTML = '';
  archivedColumn.innerHTML = '';

  expenses.forEach(expense => {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.draggable = true;
    card.dataset.id = expense.id;
    card.innerHTML = `
      <div>$${expense.amount}</div>
      <div>${expense.category}</div>
      <div>${expense.date}</div>
    `;
    if (expense.status === 'todo') todoColumn.appendChild(card);
    else if (expense.status === 'done') doneColumn.appendChild(card);
    else if (expense.status === 'archived') archivedColumn.appendChild(card);
  });

  // Initialize Sortable
  ['todo-column', 'done-column', 'archived-column'].forEach(columnId => {
    new Sortable(document.getElementById(columnId), {
      group: 'kanban',
      animation: 150,
      onEnd: handleDragEnd
    });
  });
}

function handleDragEnd(evt) {
  const expenseId = evt.item.dataset.id;
  const newStatus = evt.to.parentElement.dataset.status;
  updateExpenseStatus(expenseId, newStatus);
  renderKanbanBoard();
}

function renderCharts() {
  // Category chart
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryCtx = document.getElementById('category-chart').getContext('2d');
  new Chart(categoryCtx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryData),
      datasets: [{
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    }
  });

  // Payment method chart
  const paymentData = expenses.reduce((acc, expense) => {
    acc[expense.payment_method] = (acc[expense.payment_method] || 0) + expense.amount;
    return acc;
  }, {});

  const paymentCtx = document.getElementById('payment-chart').getContext('2d');
  new Chart(paymentCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(paymentData),
      datasets: [{
        label: 'Amount by Payment Method',
        data: Object.values(paymentData),
        backgroundColor: '#36A2EB'
      }]
    }
  });
}