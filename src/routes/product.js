import express from 'express';
import { ProductController } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/products/all', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProduct);
router.post('/products/create', authenticateToken, ProductController.createProduct);

export default router;