const Todo = require('../models/todo.model');

class TodoController {
    static async createTodo(req, res) {
        try {
            const { title, description } = req.body;
            const todo = await Todo.create({
                title,
                description,
                user_id: req.user.id
            });
            res.status(201).json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Error creating todo' });
        }
    }

    static async getTodos(req, res) {
        try {
            const todos = await Todo.findByUserId(req.user.id);
            res.json(todos);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching todos' });
        }
    }

    static async getTodo(req, res) {
        try {
            const todo = await Todo.findById(req.params.id, req.user.id);
            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching todo' });
        }
    }

    static async updateTodo(req, res) {
        try {
            const { title, description, status } = req.body;
            const updated = await Todo.update(req.params.id, req.user.id, {
                title,
                description,
                status
            });
            if (!updated) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            const todo = await Todo.findById(req.params.id, req.user.id);
            res.json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Error updating todo' });
        }
    }

    static async deleteTodo(req, res) {
        try {
            const deleted = await Todo.delete(req.params.id, req.user.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting todo' });
        }
    }
}

module.exports = TodoController; 