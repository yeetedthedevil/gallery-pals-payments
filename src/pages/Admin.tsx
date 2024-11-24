import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminGalleryList } from "@/components/AdminGalleryList";
import { CreateGalleryDialog } from "@/components/CreateGalleryDialog";
import { toast } from "sonner";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          navigate('/login');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gallery Management</h1>
        <div className="space-x-4">
          <CreateGalleryDialog />
          <Button variant="outline" onClick={() => navigate("/")}>
            View Public Site
          </Button>
        </div>
      </div>
      <AdminGalleryList />
    </div>
  );
};

export default Admin;