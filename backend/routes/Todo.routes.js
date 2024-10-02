const express = require('express');
const Todo = require('../models/Todos.model.js');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error adding todo' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    // const {userid} = req.params.id;
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting todo' });
  }
});
router.put('/:id', async (req, res) => {
  const { task } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo' });
  }
});
router.delete('/deleteAll', async (req, res) => {
  try {
    await Todo.deleteMany({}); 
    res.json({ message: 'All todos deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all todos' });
  }
});

module.exports = router;
