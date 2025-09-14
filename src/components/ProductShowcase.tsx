"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Truck,
  Plus,
  Minus,
  Eye,
  Share2
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  colors: string[];
  features: string[];
  description: string;
  ingredients: string[];
  nutrition: {
    calories: number;
    sodium: number;
    potassium: number;
    magnesium: number;
  };
}

const products: Product[] = [
  {
    id: 1,
    name: "ZELYTE Coconut Citrus",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 1247,
    badge: "BESTSELLER",
    colors: ["#FF6B35", "#FFD23F", "#06FFA5"],
    features: ["No Artificial Flavors", "15 Pouches", "Electrolyte Boost", "Instant Energy"],
    description: "Experience the perfect blend of tropical coconut and zesty citrus in our premium electrolyte pouches. Designed for athletes and health enthusiasts who demand the best.",
    ingredients: ["Coconut Water", "Natural Citrus Extract", "Sea Salt", "Potassium", "Magnesium"],
    nutrition: {
      calories: 5,
      sodium: 200,
      potassium: 300,
      magnesium: 50
    }
  },
  {
    id: 2,
    name: "ZELYTE Tropical Mango",
    price: 22.99,
    originalPrice: 27.99,
    rating: 4.8,
    reviews: 892,
    badge: "NEW",
    colors: ["#FF6B35", "#FFD23F", "#06FFA5"],
    features: ["No Artificial Flavors", "15 Pouches", "Electrolyte Boost", "Tropical Taste"],
    description: "Dive into the exotic taste of ripe mangoes with our tropical electrolyte blend. Perfect for post-workout recovery and daily hydration.",
    ingredients: ["Mango Puree", "Coconut Water", "Sea Salt", "Potassium", "Natural Flavors"],
    nutrition: {
      calories: 8,
      sodium: 180,
      potassium: 280,
      magnesium: 45
    }
  },
  {
    id: 3,
    name: "ZELYTE Berry Blast",
    price: 26.99,
    originalPrice: 31.99,
    rating: 4.7,
    reviews: 634,
    badge: "LIMITED",
    colors: ["#FF6B35", "#FFD23F", "#06FFA5"],
    features: ["No Artificial Flavors", "15 Pouches", "Electrolyte Boost", "Antioxidant Rich"],
    description: "A powerful blend of mixed berries packed with antioxidants and electrolytes. Limited edition flavor that's flying off the shelves.",
    ingredients: ["Mixed Berry Extract", "Coconut Water", "Sea Salt", "Potassium", "Antioxidants"],
    nutrition: {
      calories: 6,
      sodium: 190,
      potassium: 290,
      magnesium: 48
    }
  }
];

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const currentProduct = products[selectedProduct];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} ${currentProduct.name} to cart`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <motion.div
              className="relative aspect-square bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-8xl font-black text-white"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⚡
                </motion.div>
              </div>
              
              {/* Floating particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                {currentProduct.badge}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className={`absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </motion.div>

            {/* Product Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {products.map((product, index) => (
                <motion.button
                  key={product.id}
                  onClick={() => setSelectedProduct(index)}
                  className={`aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedProduct === index 
                      ? 'ring-4 ring-orange-400 scale-105' 
                      : 'hover:scale-105'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-2xl font-black text-white">
                    ⚡
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Product Title & Rating */}
            <div>
              <motion.h1
                className="text-4xl font-black text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {currentProduct.name}
              </motion.h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-300">
                  {currentProduct.rating} ({currentProduct.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-4xl font-black text-orange-400">
                  ${currentProduct.price}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ${currentProduct.originalPrice}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SAVE ${(currentProduct.originalPrice - currentProduct.price).toFixed(2)}
                </span>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quantity & Add to Cart */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-white font-semibold">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold text-white w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  ADD TO CART - ${(currentProduct.price * quantity).toFixed(2)}
                </button>
                <button className="w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-2xl flex items-center justify-center text-white transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </motion.div>

            {/* Product Tabs */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex gap-4 border-b border-slate-700">
                {[
                  { id: "description", label: "Description" },
                  { id: "ingredients", label: "Ingredients" },
                  { id: "nutrition", label: "Nutrition" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-2 font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'text-orange-400 border-b-2 border-orange-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "description" && (
                    <p className="text-gray-300 leading-relaxed">
                      {currentProduct.description}
                    </p>
                  )}
                  
                  {activeTab === "ingredients" && (
                    <div className="space-y-3">
                      {currentProduct.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full" />
                          <span className="text-gray-300">{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === "nutrition" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-2xl p-4">
                        <div className="text-orange-400 font-bold text-2xl">{currentProduct.nutrition.calories}</div>
                        <div className="text-gray-300 text-sm">Calories</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-2xl p-4">
                        <div className="text-orange-400 font-bold text-2xl">{currentProduct.nutrition.sodium}mg</div>
                        <div className="text-gray-300 text-sm">Sodium</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-2xl p-4">
                        <div className="text-orange-400 font-bold text-2xl">{currentProduct.nutrition.potassium}mg</div>
                        <div className="text-gray-300 text-sm">Potassium</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-2xl p-4">
                        <div className="text-orange-400 font-bold text-2xl">{currentProduct.nutrition.magnesium}mg</div>
                        <div className="text-gray-300 text-sm">Magnesium</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-black text-white text-center">
            MORE FLAVORS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.id !== currentProduct.id).map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700 hover:border-orange-400 transition-all duration-500 hover:scale-105 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProduct(product.id - 1)}
              >
                <div className="aspect-square bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center text-4xl font-black text-white mb-4">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">{product.rating}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-orange-400">${product.price}</span>
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
