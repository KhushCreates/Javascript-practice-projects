import { Favorite } from '../models/Recipe';
import { FavoritesRepository } from '../repositories/FavoritesRepository';

export class FavoritesService {
  private repository: FavoritesRepository;

  constructor() {
    this.repository = new FavoritesRepository();
  }

  async getAllFavorites(): Promise<Favorite[]> {
    return this.repository.getAll();
  }

  async getFavoriteById(id: string): Promise<Favorite | null> {
    return this.repository.getById(id);
  }

  async getFavoritesByUserId(userId: string): Promise<Favorite[]> {
    return this.repository.getByUserId(userId);
  }

  async createFavorite(data: Omit<Favorite, 'id'>): Promise<Favorite> {
    return this.repository.create(data);
  }

  async deleteFavorite(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
