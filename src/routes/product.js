import express from 'express';
import { ProductController } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', authenticateToken, ProductController.createProduct);

export default router;