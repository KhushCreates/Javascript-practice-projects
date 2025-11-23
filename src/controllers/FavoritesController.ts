import { Request, Response } from 'express';
import { FavoritesService } from '../services/FavoritesService';

export class FavoritesController {
  private service: FavoritesService;

  constructor() {
    this.service = new FavoritesService();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const favorites = await this.service.getAllFavorites();
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites', error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const favorite = await this.service.getFavoriteById(req.params.id);
      if (!favorite) {
        res.status(404).json({ message: 'Favorite not found' });
        return;
      }
      res.status(200).json(favorite);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorite', error });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const favorites = await this.service.getFavoritesByUserId(req.params.userId);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites for user', error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const favorite = await this.service.createFavorite(req.body);
      res.status(201).json(favorite);
    } catch (error) {
      res.status(500).json({ message: 'Error creating favorite', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.service.deleteFavorite(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: 'Favorite not found' });
        return;
      }
      res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting favorite', error });
    }
  }
}
