import { ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ProductCard = ({ product, onAddToCart, onViewDetails, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="product-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onViewDetails(product)}
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <img
              src={product.image_url}
              alt={product.name}
              className={`w-full h-full object-cover img-fade ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2" data-testid={`product-description-${product.id}`}>
          {product.description}
        </p>
        
        <p className="text-xs text-gray-400 italic">Click to view details</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-red-600" data-testid={`product-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg"
            data-testid={`add-to-cart-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;