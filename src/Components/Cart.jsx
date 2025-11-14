import { X, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const TELEGRAM_USERNAME = 'brokenpsychoo';

const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalItems = cart.length;
  
  // Apply 20% discount if more than 1 item in cart
  const hasDiscount = cart.length > 1;
  const discount = hasDiscount ? subtotal * 0.20 : 0;
  const totalAmount = subtotal - discount;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Format order message for Telegram with emojis
    let message = '═══════════════════\n';
    message += '💎 *ORDER REQUEST* 💎\n';
    message += '═══════════════════\n\n';
    
    message += '📋 *Selected Stocks:*\n';
    cart.forEach((item, index) => {
      // Extract stock number from name
      const stockMatch = item.name.match(/^#(\d+)/);
      const stockNum = stockMatch ? `#${stockMatch[1]}` : item.name;
      message += `   ${index + 1}. Stock ${stockNum}\n`;
    });
    
    message += '\n';
    message += '═══════════════════\n';
    message += `💰 *TOTAL: $${totalAmount.toFixed(2)}*\n`;
    message += '═══════════════════\n';

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;
    
    // Open Telegram
    window.open(telegramUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
        data-testid="cart-backdrop"
      />

      {/* Cart Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 animate-slideInRight"
        data-testid="cart-panel"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <p className="text-sm text-gray-500 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              data-testid="close-cart"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-1 p-6">
            {cart.length === 0 ? (
              <div className="text-center py-16" data-testid="empty-cart">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 text-sm">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate" data-testid={`cart-item-name-${item.id}`}>
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-red-600 text-sm font-medium"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-900" data-testid={`cart-item-total-${item.id}`}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {cart.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={onClearCart}
                    className="w-full mt-4 text-red-500 border-red-200 hover:bg-red-50"
                    data-testid="clear-cart"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium" data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                
                {hasDiscount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-medium">🎉 Discount (20%)</span>
                    <span className="font-medium text-green-600" data-testid="cart-discount">-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-red-600" data-testid="cart-total">${totalAmount.toFixed(2)}</span>
                </div>
                
                {hasDiscount && (
                  <p className="text-xs text-green-600 font-medium text-center">
                    💰 You saved ${discount.toFixed(2)} with multi-stock discount!
                  </p>
                )}
              </div>
              
              <Button
                onClick={handleCheckout}
                className="w-full h-14 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl"
                data-testid="checkout-button"
              >
                <Send className="w-5 h-5 mr-2" />
                Contact on Telegram
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                You'll be redirected to Telegram to complete your order
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;