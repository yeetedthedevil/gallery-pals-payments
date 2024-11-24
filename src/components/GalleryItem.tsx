import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GalleryItemProps {
  image: {
    id: string;
    url: string;
    title: string;
    price: number;
    category: string;
  };
}

export function GalleryItem({ image }: GalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePayPalPayment = async () => {
    // Replace with your PayPal.me username
    const paypalUsername = "YOUR_PAYPAL_USERNAME";
    const paypalUrl = `https://paypal.me/${paypalUsername}/${image.price}`;
    
    // Open PayPal in new window
    window.open(paypalUrl, '_blank');
    toast.success("PayPal payment window opened");
    setIsOpen(false);
  };

  return (
    <>
      <div className="gallery-item" onClick={() => setIsOpen(true)}>
        <img src={image.url} alt={image.title} className="gallery-image" />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <div className="grid gap-4">
            <img 
              src={image.url} 
              alt={image.title} 
              className="w-full rounded-lg object-cover"
            />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{image.title}</h3>
              <p className="text-muted-foreground">
                Price: ${image.price}
              </p>
              <Button 
                onClick={handlePayPalPayment}
                className="w-full"
              >
                Pay with PayPal (Friends & Family)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}