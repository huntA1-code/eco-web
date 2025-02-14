import { ChevronLeft, ChevronRight } from 'lucide-react';
interface ImageGalleryProps {
  images: string[];
  selectedImage: number;
  productName: string;
  onImageSelect: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}
export function ImageGallery({
  images,
  selectedImage,
  productName,
  onImageSelect,
  onNext,
  onPrevious
}: ImageGalleryProps) {
  return <div className="grid grid-cols-12 gap-4">
      {/* Thumbnails */}
      <div className="hidden md:block col-span-1 -ml-3">
        <div className="flex flex-col gap-2 sticky top-0">
          {images.map((image, index) => <button key={index} onClick={() => onImageSelect(index)} className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}>
              <img src={image} alt={`${productName} view ${index + 1}`} className="w-full h-full object-cover" />
            </button>)}
        </div>
      </div>

      {/* Main Image */}
      <div className="col-span-11">
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative">
          <img src={images[selectedImage]} alt={productName} className="w-full h-full object-cover" />
          <button onClick={onPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>;
}