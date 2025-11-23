import { Review } from '../models/Recipe';
import { ReviewRepository } from '../repositories/ReviewRepository';

export class ReviewService {
  private repository: ReviewRepository;

  constructor() {
    this.repository = new ReviewRepository();
  }

  async getAllReviews(): Promise<Review[]> {
    return this.repository.getAll();
  }

  async getReviewById(id: string): Promise<Review | null> {
    return this.repository.getById(id);
  }

  async getReviewsByRecipeId(recipeId: string): Promise<Review[]> {
    return this.repository.getByRecipeId(recipeId);
  }

  async createReview(data: Omit<Review, 'id'>): Promise<Review> {
    return this.repository.create(data);
  }

  async updateReview(id: string, data: Partial<Omit<Review, 'id'>>): Promise<boolean> {
    return this.repository.update(id, data);
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
