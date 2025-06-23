"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Zap, Users, Shield, Clock, Globe } from "lucide-react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Star, Smartphone } from "lucide-react";

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Lightning Fast",
      description: "Built with Next.js 15 and Turbopack for instant loading and updates.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Team Collaboration",
      description: "Real-time updates and seamless collaboration with your team members.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Enterprise Security",
      description: "Bank-level security with JWT authentication and rate limiting.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Time Tracking",
      description: "Built-in time tracking and productivity analytics for better insights.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Access",
      description: "Access your boards from anywhere in the world with cloud sync.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Mobile Ready",
      description: "Perfect experience on any device. Work from anywhere, anytime.",
      color: "from-teal-500 to-blue-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "BoardHub has transformed how our team manages projects. The drag-and-drop interface is intuitive and the real-time collaboration features are game-changing.",
    },
    {
      name: "Mike Chen",
      role: "CTO",
      company: "StartupXYZ",
      content: "We've tried many project management tools, but BoardHub strikes the perfect balance between simplicity and power. Highly recommended!",
    },
    {
      name: "Emily Rodriguez",
      role: "Design Lead",
      company: "Creative Studio",
      content: "The visual workflow management and beautiful UI make project planning actually enjoyable. Our team productivity has increased by 40%.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">Amplify Results</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">From simple task lists to complex workflows, BoardHub scales</p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Button
                asChild
                size="lg"
                className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-10 py-6">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>

            <div
              className={`flex items-center justify-center space-x-8 text-sm text-muted-foreground transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Setup in 2 minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Everything you need to succeed</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Powerful features designed to streamline your workflow and boost productivity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-card border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Loved by teams worldwide</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">See what our users have to say about their experience with BoardHub</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to transform your workflow?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams who have already improved their productivity with BoardHub
            </p>
            <Button
              asChild
              size="lg"
              className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
