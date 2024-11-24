import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminGalleryList } from "@/components/AdminGalleryList";
import { CreateGalleryDialog } from "@/components/CreateGalleryDialog";
import { toast } from "sonner";

const ADMIN_PASSWORD = "admin123"; // In a real app, this should be stored securely

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("Successfully logged in");
    } else {
      toast.error("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-md py-12">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    );
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