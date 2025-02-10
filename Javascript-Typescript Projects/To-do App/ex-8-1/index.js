const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
const mongoDB = 'mongodb+srv://REDACTED';
mongoose.connect(mongoDB)
  .then(() => console.log('Database connected'))
  .catch(error => console.error('Connection error:', error));

// Mongoose schema and model
const todoSchema = new mongoose.Schema({ text: { type: String, required: true } });
const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const todo = new Todo({ text });
    const savedTodo = await todo.save();
    res.json(savedTodo);  // Return the saved todo
  } catch (error) {
    res.status(404).json({ error: 'Failed to save todo' });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(404).json({ error: 'Failed to fetch todos' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { text } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { text }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(404).json({ error: 'Failed to update todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const doc = await Todo.findByIdAndDelete(req.params.id);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
