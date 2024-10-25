import { db } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const UserModel = {
  async create({ email, password, name }) {
    const userId = uuidv4();
    await db.execute({
      sql: 'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
      args: [userId, email, password, name]
    });
    return userId;
  },

  async findByEmail(email) {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });
    return result.rows[0];
  },

  async findById(id) {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [id]
    });
    return result.rows[0];
  }
};
