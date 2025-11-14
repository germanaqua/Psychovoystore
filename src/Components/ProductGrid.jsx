import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Package } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductGrid = ({ products, loading, onAddToCart, cartItemCount, onCartClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 flex items-center justify-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_easystore-46/artifacts/bw2gxhv5_1ua91yxb_file_00000000fb787207bd93a3b7c55b4894.png" 
                  alt="PSYCHO VOY Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  PSYCHO VOY
                </h1>
                <p className="text-xs text-gray-500">Premium Content Store</p>
              </div>
            </div>
            
            <button
              onClick={onCartClick}
              className="relative p-3 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              data-testid="cart-button"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center badge-pulse" data-testid="cart-badge">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 border-b border-gray-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center space-y-4 animate-fadeIn">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Exclusive
              <span className="block bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Premium Content
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our collection and contact us on Telegram for subscription
            </p>
            <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl max-w-3xl mx-auto">
              <p className="text-sm text-red-900 font-medium">
                ⚠️ This store contains adult content (18+). Subscription is permitted only to those 18 years of age or older. The content is of a cultural and educational nature.
              </p>
            </div>
            
            {/* Payment & Trust Info */}
            <div className="mt-6 space-y-4 max-w-4xl mx-auto">
              <div className="p-4 bg-green-50 border border-green-300 rounded-xl">
                <p className="text-sm text-green-900 font-medium text-center">
                  💳 We accept Card, Crypto, and Binance Gift Card. For other payment methods, contact on Telegram.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <div className="p-3 bg-blue-50 border border-blue-300 rounded-xl">
                  <p className="text-sm text-blue-900 font-semibold text-center">
                    ✅ Trusted by 500+ customers
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-xl">
                  <p className="text-sm text-yellow-900 font-semibold text-center">
                    ⚠️ DON'T ASK FOR DEMO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                data-testid="search-input"
              />
            </div>
            <div className="sm:w-64">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-12 border-gray-300" data-testid="category-filter">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} data-testid={`category-${category}`}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="skeleton h-64 w-full" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20" data-testid="no-products">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={handleViewDetails}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 PSYCHO VOY. Contact us on Telegram for subscriptions.</p>
          <p className="text-xs text-gray-500 mt-2">18+ Adult Content Store</p>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default ProductGrid;