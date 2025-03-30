const db = require('../config/db.config');

class Todo {
    static async create(todoData) {
        const { title, description, user_id } = todoData;
        const [result] = await db.execute(
            'INSERT INTO todos (title, description, user_id, status) VALUES (?, ?, ?, ?)',
            [title, description, user_id, 'pending']
        );
        return result.insertId;
    }

    static async findByUserId(userId) {
        const [rows] = await db.execute(
            'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        return rows;
    }

    static async findById(id, userId) {
        const [rows] = await db.execute(
            'SELECT * FROM todos WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return rows[0];
    }

    static async update(id, userId, todoData) {
        const { title, description, status } = todoData;
        const [result] = await db.execute(
            'UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
            [title, description, status, id, userId]
        );
        return result.affectedRows > 0;
    }

    static async delete(id, userId) {
        const [result] = await db.execute(
            'DELETE FROM todos WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Todo; 