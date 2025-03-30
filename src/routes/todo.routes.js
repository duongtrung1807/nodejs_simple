const express = require('express');
const TodoController = require('../controllers/todo.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.use(auth); // Protect all todo routes

router.post('/', TodoController.createTodo);
router.get('/', TodoController.getTodos);
router.get('/:id', TodoController.getTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router; 