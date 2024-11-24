import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Gallery {
  id: string;
  name: string;
  password: string;
  price: number;
}

export function AdminGalleryList() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    password: "",
    price: 0,
  });

  const handleEdit = (gallery: Gallery) => {
    setEditingId(gallery.id);
    setEditForm({
      name: gallery.name,
      password: gallery.password,
      price: gallery.price,
    });
  };

  const handleSave = (id: string) => {
    setGalleries((prev) =>
      prev.map((gallery) =>
        gallery.id === id
          ? { ...gallery, ...editForm }
          : gallery
      )
    );
    setEditingId(null);
    toast.success("Gallery updated successfully");
  };

  const handleDelete = (id: string) => {
    setGalleries((prev) => prev.filter((gallery) => gallery.id !== id));
    toast.success("Gallery deleted successfully");
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gallery Name</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Price ($)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {galleries.map((gallery) => (
            <TableRow key={gallery.id}>
              <TableCell>
                {editingId === gallery.id ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                ) : (
                  gallery.name
                )}
              </TableCell>
              <TableCell>
                {editingId === gallery.id ? (
                  <Input
                    type="password"
                    value={editForm.password}
                    onChange={(e) =>
                      setEditForm({ ...editForm, password: e.target.value })
                    }
                  />
                ) : (
                  "••••••••"
                )}
              </TableCell>
              <TableCell>
                {editingId === gallery.id ? (
                  <Input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                ) : (
                  gallery.price
                )}
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  {editingId === gallery.id ? (
                    <Button
                      size="sm"
                      onClick={() => handleSave(gallery.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(gallery)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(gallery.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}