import { X, ShoppingCart, Package, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]" data-testid="product-detail-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {product.name}
          </DialogTitle>
          <DialogDescription>
            <Badge className="mt-2 bg-red-100 text-red-800 hover:bg-red-200">
              {product.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* Image */}
            <div className="relative h-80 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div>';
                }}
              />
            </div>

            {/* Price */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-3xl font-bold text-red-600" data-testid="modal-price">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Description
              </h3>
              <div className="p-4 bg-white border border-gray-200 rounded-xl">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed" data-testid="modal-description">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Disclaimer for premium content */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-red-900">
                    ⚠️ Important Notice - Adult Content (18+)
                  </p>
                  <p className="text-xs text-red-800">
                    This is cultural and educational material. By subscribing, you confirm you are 18+ years of age.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            data-testid="modal-close"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold"
            data-testid="modal-add-to-cart"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
