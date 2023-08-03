const express = require('express');
const router = express.Router();
const Task = require('../Schemas/task');

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: 'pending',
  });

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/tasks/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findOne({ _id: id });
    res.json(task);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put('/tasks/:id', async (req, res) => {
  const id = req.params.id;

  const taskData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Task.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;