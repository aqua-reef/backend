import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required()
});

export const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  subcategory: Joi.string(),
  description: Joi.string(),
  price: Joi.number().positive().required(),
  stock_quantity: Joi.number().integer().min(0).required(),
  image_urls: Joi.array().items(Joi.string().uri()),
  specifications: Joi.object(),
  care_level: Joi.string().valid('beginner', 'intermediate', 'expert'),
  tank_size_minimum: Joi.number(),
  temperature_range: Joi.string(),
  ph_range: Joi.string()
});