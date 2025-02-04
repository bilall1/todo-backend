const { test, expect } = require('@playwright/test');

test.describe('Todo API Tests', () => {
  test('should read all todos', async ({ request }) => {
    const response = await request.get('/read');
    expect(response.ok()).toBeTruthy();
    
    const todos = await response.json();
    expect(Array.isArray(todos)).toBeTruthy();
    expect(todos.length).toBeGreaterThanOrEqual(10);
    
    // Verify todo structure
    const firstTodo = todos[0];
    expect(firstTodo).toHaveProperty('id');
    expect(firstTodo).toHaveProperty('task');
    expect(firstTodo).toHaveProperty('completed');
  });

  test('should create a new todo', async ({ request }) => {
    const newTodo = {
      task: 'Test todo item'
    };

    const response = await request.post('/post', {
      data: newTodo
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const createdTodo = await response.json();
    expect(createdTodo).toHaveProperty('id');
    expect(createdTodo.task).toBe(newTodo.task);
    expect(createdTodo.completed).toBe(false);

    // Verify the todo was actually added by reading all todos
    const getAllResponse = await request.get('/read');
    const allTodos = await getAllResponse.json();
    const foundTodo = allTodos.find(todo => todo.id === createdTodo.id);
    expect(foundTodo).toBeTruthy();
    expect(foundTodo.task).toBe(newTodo.task);
  });

  test('should fail when creating todo without task', async ({ request }) => {
    const response = await request.post('/post', {
      data: {}
    });
    
    expect(response.status()).toBe(400);
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
    expect(errorResponse.error).toBe('Task is required and must be a non-empty string');
  });
}); 