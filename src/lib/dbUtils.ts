import { v4 as uuidv4 } from 'uuid';
import pool from './db';

export interface Gallery {
  id: string;
  name: string;
  password: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Image {
  id: string;
  gallery_id: string;
  url: string;
  title?: string;
  created_at?: Date;
}

export interface Payment {
  id: string;
  gallery_id: string;
  amount: number;
  status: string;
  paypal_transaction_id?: string;
  created_at?: Date;
}

export const dbUtils = {
  // Gallery operations
  async createGallery(name: string, password: string, price: number): Promise<Gallery> {
    const id = uuidv4();
    const [result] = await pool.execute(
      'INSERT INTO galleries (id, name, password, price) VALUES (?, ?, ?, ?)',
      [id, name, password, price]
    );
    return { id, name, password, price };
  },

  async getGallery(id: string): Promise<Gallery | null> {
    const [rows] = await pool.execute('SELECT * FROM galleries WHERE id = ?', [id]);
    return (rows as Gallery[])[0] || null;
  },

  async updateGallery(gallery: Gallery): Promise<void> {
    await pool.execute(
      'UPDATE galleries SET name = ?, password = ?, price = ? WHERE id = ?',
      [gallery.name, gallery.password, gallery.price, gallery.id]
    );
  },

  async deleteGallery(id: string): Promise<void> {
    await pool.execute('DELETE FROM galleries WHERE id = ?', [id]);
  },

  async getAllGalleries(): Promise<Gallery[]> {
    const [rows] = await pool.execute('SELECT * FROM galleries ORDER BY created_at DESC');
    return rows as Gallery[];
  },

  // Image operations
  async addImage(gallery_id: string, url: string, title?: string): Promise<Image> {
    const id = uuidv4();
    await pool.execute(
      'INSERT INTO images (id, gallery_id, url, title) VALUES (?, ?, ?, ?)',
      [id, gallery_id, url, title]
    );
    return { id, gallery_id, url, title };
  },

  async getGalleryImages(gallery_id: string): Promise<Image[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM images WHERE gallery_id = ? ORDER BY created_at DESC',
      [gallery_id]
    );
    return rows as Image[];
  },

  // Payment operations
  async createPayment(gallery_id: string, amount: number): Promise<Payment> {
    const id = uuidv4();
    await pool.execute(
      'INSERT INTO payments (id, gallery_id, amount, status) VALUES (?, ?, ?, ?)',
      [id, gallery_id, amount, 'pending']
    );
    return { id, gallery_id, amount, status: 'pending' };
  },

  async updatePaymentStatus(id: string, status: string, paypal_transaction_id?: string): Promise<void> {
    await pool.execute(
      'UPDATE payments SET status = ?, paypal_transaction_id = ? WHERE id = ?',
      [status, paypal_transaction_id, id]
    );
  }
};