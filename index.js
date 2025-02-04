const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for todos
let todos = [
    {
        id: 1,
        task: "Complete project presentation",
        completed: false
    },
    {
        id: 2,
        task: "Buy groceries",
        completed: true
    },
    {
        id: 3,
        task: "Schedule dentist appointment",
        completed: false
    },
    {
        id: 4,
        task: "Read new book chapter",
        completed: false
    },
    {
        id: 5,
        task: "Go to gym",
        completed: true
    },
    {
        id: 6,
        task: "Pay utility bills",
        completed: false
    },
    {
        id: 7,
        task: "Call mom",
        completed: true
    },
    {
        id: 8,
        task: "Clean the garage",
        completed: false
    },
    {
        id: 9,
        task: "Update resume",
        completed: false
    },
    {
        id: 10,
        task: "Water the plants",
        completed: true
    }
];

// Read todos endpoint
app.get('/read', (req, res) => {
    res.json(todos);
});

// Create todo endpoint
app.post('/post', (req, res) => {
    if (!req.body.task || typeof req.body.task !== 'string' || req.body.task.trim() === '') {
        return res.status(400).json({
            error: 'Task is required and must be a non-empty string'
        });
    }

    const newTodo = {
        id: todos.length + 1,
        task: req.body.task.trim(),
        completed: false
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.listen(port, () => {
    console.log(`Todo backend running at http://localhost:${port}`);
}); 