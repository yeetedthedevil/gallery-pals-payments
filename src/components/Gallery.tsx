import { useState } from 'react';
import { GalleryItem } from './GalleryItem';
import { Button } from "@/components/ui/button";

const SAMPLE_IMAGES = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
    title: 'Nature Collection #1',
    price: 25,
    category: 'nature'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'Nature Collection #2',
    price: 25,
    category: 'nature'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    title: 'Nature Collection #3',
    price: 25,
    category: 'nature'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    title: 'Nature Collection #4',
    price: 25,
    category: 'nature'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    title: 'Nature Collection #5',
    price: 25,
    category: 'nature'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    title: 'Nature Collection #6',
    price: 25,
    category: 'nature'
  }
];

const CATEGORIES = ['all', 'nature', 'portrait', 'event'];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = selectedCategory === 'all' 
    ? SAMPLE_IMAGES
    : SAMPLE_IMAGES.filter(img => img.category === selectedCategory);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="gallery-grid">
        {filteredImages.map((image) => (
          <GalleryItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}