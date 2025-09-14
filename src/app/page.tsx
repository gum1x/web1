"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Star, 
  Shield, 
  Truck, 
  Heart, 
  ShoppingCart, 
  Menu,
  X,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductShowcase from "@/components/ProductShowcase";

export default function MarketplacePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const products = [
    {
      id: 1,
      name: "ZELYTE Coconut Citrus",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.9,
      reviews: 1247,
      image: "/api/placeholder/400/400",
      badge: "BESTSELLER",
      colors: ["#FF6B35", "#FFD23F", "#06FFA5"],
      features: ["No Artificial Flavors", "15 Pouches", "Electrolyte Boost"]
    },
    {
      id: 2,
      name: "ZELYTE Tropical Mango",
      price: 22.99,
      originalPrice: 27.99,
      rating: 4.8,
      reviews: 892,
      image: "/api/placeholder/400/400",
      badge: "NEW",
      colors: ["#FF6B35", "#FFD23F", "#06FFA5"],
      features: ["No Artificial Flavors", "15 Pouches", "Electrolyte Boost"]
    },
    {
      id: 3,
      name: "ZELYTE Berry Blast",
      price: 26.99,
      originalPrice: 31.99,
      rating: 4.7,
      reviews: 634,
      image: "/api/placeholder/400/400",
      badge: "LIMITED",
      colors: ["#FF6B35", "#FFD23F", "#06FFA5"],
      features: ["No Artificial Flavors", "15 Pouches", "Electrolyte Boost"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "ZELYTE has completely transformed my workout recovery. The coconut citrus flavor is absolutely incredible!",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Mike Chen",
      role: "Marathon Runner",
      content: "Finally found an electrolyte supplement that actually works. No artificial flavors, just pure energy.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Emma Rodriguez",
      role: "Yoga Instructor",
      content: "The convenience of these pouches is unmatched. Perfect for my active lifestyle and busy schedule.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Energy",
      description: "Rapid electrolyte absorption for immediate performance boost"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Natural Ingredients",
      description: "No artificial flavors, colors, or preservatives"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Complimentary delivery on orders over $50"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health Focused",
      description: "Designed for athletes and health-conscious individuals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <Navigation />
      
      {/* Hero Section with Insane Opening Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
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
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black text-white mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ZELYTE
            </motion.h1>
            <motion.div
              className="text-2xl md:text-4xl font-bold text-orange-400 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              ELECTROLYTE POUCHES
            </motion.div>
            <motion.div
              className="text-xl md:text-2xl text-yellow-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              COCONUT CITRUS • 15 POUCHES
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-xl opacity-75 animate-pulse" />
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full p-1">
                <div className="bg-slate-900 rounded-full p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-6xl font-black text-white">
                    ⚡
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-full text-lg hover:scale-105 transition-transform duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                SHOP NOW
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="group relative px-8 py-4 border-2 border-orange-400 text-orange-400 font-bold rounded-full text-lg hover:bg-orange-400 hover:text-white transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-5 h-5" />
                WATCH DEMO
              </span>
            </button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "4.9★", label: "Average Rating" },
              { number: "15", label: "Pouches per Tin" },
              { number: "0%", label: "Artificial Flavors" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.8 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-black text-orange-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-orange-400 rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              CHOOSE YOUR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                FLAVOR
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium electrolyte pouches designed for peak performance and maximum convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700 hover:border-orange-400 transition-all duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {product.badge}
                </div>

                {/* Product Image */}
                <div className="relative mb-6">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center text-6xl font-black text-white mb-4">
                    ⚡
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-black text-orange-400">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300">
                  ADD TO CART
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              WHY CHOOSE
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                ZELYTE?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              WHAT OUR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                CUSTOMERS SAY
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              READY TO EXPERIENCE
              <span className="block">THE DIFFERENCE?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes and health enthusiasts who have made ZELYTE their go-to electrolyte solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-orange-500 font-bold rounded-full text-lg hover:scale-105 transition-transform duration-300">
                SHOP NOW
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-orange-500 transition-all duration-300">
                LEARN MORE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl font-black text-white mb-4">ZELYTE</div>
          <div className="text-gray-400 mb-8">Premium Electrolyte Pouches</div>
          <div className="text-sm text-gray-500">
            © 2024 ZELYTE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
