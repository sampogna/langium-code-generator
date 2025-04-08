import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'


// Initialize Supabase
const supabaseUrl = 'https://tzbmfrhnliojknjwyvui.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6Ym1mcmhubGlvamtuand5dnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjI0NTcsImV4cCI6MjA1OTEzODQ1N30.aG2JxIQt-TWyxfl39Q1RbrifOsBIpD09ytvbFty0TOc';
const supabase = createClient(supabaseUrl, supabaseKey);

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load todos when page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Form submission
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const task = todoInput.value.trim();
  if (task) {
    await addTodo(task);
    todoInput.value = '';
    loadTodos();
  }
});

// Load todos from Supabase
async function loadTodos() {
  debugger;
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error loading todos:', error);
    return;
  }
  
  renderTodos(todos);
}

// Render todos to the DOM
function renderTodos(todos) {
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    todoItem.innerHTML = `
      <div class="todo-text">${todo.task}</div>
      <div class="todo-actions">
        <button onclick="toggleTodo(${todo.id}, ${todo.completed})">
          ${todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;
    
    todoList.appendChild(todoItem);
  });
}

// Add a new todo
async function addTodo(task) {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ task }]);
  
  if (error) {
    console.error('Error adding todo:', error);
  }
}

// Toggle todo completion status
async function toggleTodo(id, currentStatus) {
  const { error } = await supabase
    .from('todos')
    .update({ completed: !currentStatus })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating todo:', error);
  } else {
    loadTodos();
  }
}

// Delete a todo
async function deleteTodo(id) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting todo:', error);
  } else {
    loadTodos();
  }
}

// Make functions available globally
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;