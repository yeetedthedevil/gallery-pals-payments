import { Gallery } from "@/components/Gallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">Client Gallery</h1>
          <p className="text-muted-foreground mt-2">
            Browse and purchase your favorite photos
          </p>
        </div>
      </header>
      <main>
        <Gallery />
      </main>
    </div>
  );
};

export default Index;