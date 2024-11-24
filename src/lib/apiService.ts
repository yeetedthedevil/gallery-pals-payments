import type { Gallery } from './dbUtils';

const API_URL = '/api'; // This should point to your backend API URL

export const apiService = {
  async getAllGalleries(): Promise<Gallery[]> {
    const response = await fetch(`${API_URL}/galleries`);
    if (!response.ok) {
      throw new Error('Failed to fetch galleries');
    }
    return response.json();
  },

  async createGallery(name: string, password: string, price: number): Promise<Gallery> {
    const response = await fetch(`${API_URL}/galleries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, price }),
    });
    if (!response.ok) {
      throw new Error('Failed to create gallery');
    }
    return response.json();
  },

  async updateGallery(gallery: Gallery): Promise<void> {
    const response = await fetch(`${API_URL}/galleries/${gallery.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gallery),
    });
    if (!response.ok) {
      throw new Error('Failed to update gallery');
    }
  },

  async deleteGallery(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/galleries/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete gallery');
    }
  },
};