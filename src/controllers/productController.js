import { ProductModel } from '../models/product.js';

export const ProductController = {
  async createProduct(req, res) {
    try {
      const productId = await ProductModel.create(req.body);
      res.status(201).json({ 
        message: 'Product created successfully',
        productId 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const { category } = req.query;
      const products = await ProductModel.findAll({ category });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getProduct(req, res) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};