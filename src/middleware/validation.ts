import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const recipeValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      description: Joi.string().min(10).max(500).required(),
      cookingTime: Joi.number().integer().min(1).max(1000).required(),
      difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
      cuisineType: Joi.string().min(2).max(50).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    next();
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100),
      description: Joi.string().min(10).max(500),
      cookingTime: Joi.number().integer().min(1).max(1000),
      difficulty: Joi.string().valid('Easy', 'Medium', 'Hard'),
      cuisineType: Joi.string().min(2).max(50)
    }).min(1); // at least one field required for update

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    next();
  }
};