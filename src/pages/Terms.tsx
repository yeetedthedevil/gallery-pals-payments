import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Terms = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAccept = async () => {
    if (!accepted) {
      toast.error("Please accept the terms and conditions to continue");
      return;
    }

    try {
      const response = await fetch('/api/terms/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        toast.success("Terms accepted successfully");
        navigate('/');
      } else {
        toast.error("Failed to accept terms");
      }
    } catch (error) {
      toast.error("Failed to accept terms");
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <div className="prose prose-sm">
        <h2>1. Non-Refundable Purchase</h2>
        <p>All purchases are final and non-refundable. By purchasing images from our galleries, you acknowledge and agree that no refunds will be provided under any circumstances.</p>

        <h2>2. Image Usage</h2>
        <p>Upon purchase, you will receive access to unwatermarked versions of the images. These images are for personal use only unless otherwise specified.</p>

        <h2>3. Download Links</h2>
        <p>Download links for purchased images will be sent to your email address. These links are time-sensitive and will expire after 24 hours.</p>

        <h2>4. IP Address Logging</h2>
        <p>We log IP addresses for security purposes and to prevent abuse of our service.</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept the terms and conditions
          </label>
        </div>

        <Button onClick={handleAccept} className="w-full">
          Accept and Continue
        </Button>
      </div>
    </div>
  );
};

export default Terms;