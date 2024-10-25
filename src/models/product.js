import { db } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const ProductModel = {
  async create(productData) {
    const productId = uuidv4();
    const {
      name, category, subcategory, description, price,
      stock_quantity, image_urls, specifications, care_level,
      tank_size_minimum, temperature_range, ph_range
    } = productData;

    await db.execute({
      sql: `
        INSERT INTO products (
          id, name, category, subcategory, description, price,
          stock_quantity, image_urls, specifications, care_level,
          tank_size_minimum, temperature_range, ph_range
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        productId, name, category, subcategory, description, price,
        stock_quantity, JSON.stringify(image_urls), JSON.stringify(specifications),
        care_level, tank_size_minimum, temperature_range, ph_range
      ]
    });
    return productId;
  },

  async findAll(filters = {}) {
    let sql = 'SELECT * FROM products';
    const args = [];

    if (filters.category) {
      sql += ' WHERE category = ?';
      args.push(filters.category);
    }

    const result = await db.execute({ sql, args });
    return result.rows.map(product => ({
      ...product,
      image_urls: JSON.parse(product.image_urls),
      specifications: JSON.parse(product.specifications)
    }));
  },

  async findById(id) {
    const result = await db.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [id]
    });
    
    if (!result.rows[0]) return null;
    
    const product = result.rows[0];
    return {
      ...product,
      image_urls: JSON.parse(product.image_urls),
      specifications: JSON.parse(product.specifications)
    };
  }
};