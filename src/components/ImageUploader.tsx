import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  galleryId: string;
  onUploadComplete: () => void;
}

export function ImageUploader({ galleryId, onUploadComplete }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: async (acceptedFiles) => {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append('galleryId', galleryId);
      
      acceptedFiles.forEach(file => {
        formData.append('images', file);
      });

      try {
        const response = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success("Images uploaded successfully");
          onUploadComplete();
        } else {
          toast.error("Failed to upload images");
        }
      } catch (error) {
        toast.error("Failed to upload images");
      } finally {
        setUploading(false);
        setProgress(0);
      }
    }
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-primary' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p>Drag and drop images here, or click to select files</p>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-center">{progress}% uploaded</p>
        </div>
      )}
    </div>
  );
}