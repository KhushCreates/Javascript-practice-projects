import { Request, Response } from 'express';
import { ReviewService } from '../services/ReviewService';

export class ReviewController {
  private service: ReviewService;

  constructor() {
    this.service = new ReviewService();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await this.service.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const review = await this.service.getReviewById(req.params.id);
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching review', error });
    }
  }

  async getByRecipeId(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await this.service.getReviewsByRecipeId(req.params.recipeId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews for recipe', error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const review = await this.service.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: 'Error creating review', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.service.updateReview(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating review', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.service.deleteReview(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting review', error });
    }
  }
}
