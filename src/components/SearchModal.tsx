
import { useState, useRef } from 'react';
import { Search, Image, X, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchMode, setSearchMode] = useState<'text' | 'image'>('text');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (searchMode === 'text' && searchText.trim()) {
      console.log('Searching for text:', searchText);
      // TODO: Implement text search logic
    } else if (searchMode === 'image' && selectedImage) {
      console.log('Searching with image:', selectedImage);
      // TODO: Implement image search logic
    }
    onClose();
  };

  const resetSearch = () => {
    setSearchText('');
    setSelectedImage(null);
    setImagePreview(null);
    setSearchMode('text');
  };

  const handleClose = () => {
    resetSearch();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[95vw] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            Search Products
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Search Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={searchMode === 'text' ? 'default' : 'outline'}
              onClick={() => setSearchMode('text')}
              className="flex-1 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Text Search
            </Button>
            <Button
              variant={searchMode === 'image' ? 'default' : 'outline'}
              onClick={() => setSearchMode('image')}
              className="flex-1 flex items-center gap-2"
            >
              <Image className="w-4 h-4" />
              Image Search
            </Button>
          </div>

          {/* Text Search */}
          {searchMode === 'text' && (
            <div className="space-y-4 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              {/* Popular Searches */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Dresses', 'Sneakers', 'Bags', 'Jewelry', 'T-shirts'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchText(term)}
                      className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Image Search */}
          {searchMode === 'image' && (
            <div className="space-y-4 animate-fade-in">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-48 mx-auto rounded-lg object-contain"
                    />
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Upload an image to search</p>
                      <p className="text-muted-foreground">
                        Drag and drop or click to browse
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <p className="text-xs text-muted-foreground text-center">
                Supported formats: JPG, PNG, WebP (Max 10MB)
              </p>
            </div>
          )}

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={
              (searchMode === 'text' && !searchText.trim()) ||
              (searchMode === 'image' && !selectedImage)
            }
            className="w-full mt-6 h-12 text-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
