import * as React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FeaturedCreators from "@/components/FeaturedCreators";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, Heart, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTopCreators } from "@/hooks/useCreators";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PricingBanner />
        <TopCreatorsLeaderboard />
        <HowItWorks />
        <FeaturedCreators />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

const PricingBanner = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-secondary rounded-2xl p-6 md:p-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Low Platform Fee</h2>
            <p className="text-muted-foreground max-w-xl">
              Only 3.5% platform fee on payments and free payouts* to your bank account
            </p>
            <p className="text-primary font-medium mt-2">
              So you get more in your pocket
            </p>
          </div>
          <div className="flex items-center justify-center bg-primary/10 px-6 py-3 rounded-full">
            <span className="text-primary font-bold text-xl md:text-2xl">3.5%</span>
            <span className="text-primary ml-2 text-sm">platform fee</span>
          </div>
        </motion.div>
        <div className="text-center mt-3">
          <p className="text-xs text-muted-foreground">
            *Free payouts available for amounts over ₹1000, smaller amounts may incur a nominal fee.
          </p>
        </div>
      </div>
    </section>
  );
};

const TopCreatorsLeaderboard = () => {
  const { data: topCreators, isLoading, error } = useTopCreators(5);
  
  const fallbackCreators = [
    { id: "1", name: "Ananya Sharma", username: "ananya", avatar: "https://i.pravatar.cc/150?img=1", supporter_count: 245, category: "Artist" },
    { id: "2", name: "Vikram Mehta", username: "vikram", avatar: "https://i.pravatar.cc/150?img=2", supporter_count: 189, category: "Musician" },
    { id: "3", name: "Priya Patel", username: "priya", avatar: "https://i.pravatar.cc/150?img=3", supporter_count: 176, category: "Writer" },
    { id: "4", name: "Raj Kumar", username: "rajkumar", avatar: "https://i.pravatar.cc/150?img=4", supporter_count: 152, category: "Podcaster" },
    { id: "5", name: "Maya Desai", username: "maya", avatar: "https://i.pravatar.cc/150?img=5", supporter_count: 124, category: "Photographer" },
  ];

  const creatorsToDisplay = error || !topCreators ? fallbackCreators : topCreators;

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full mb-4"
          >
            <Trophy className="h-4 w-4" />
            <span className="font-medium">Top Creators</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Meet Our Rising Stars
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            These creators are building passionate communities and receiving the most support
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading top creators...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {creatorsToDisplay.map((creator, index) => (
              <div 
                key={creator.id}
                className={`bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                  index === 0 ? "md:col-span-3 flex flex-col md:flex-row" : ""
                }`}
              >
                <div className={`${index === 0 ? "md:w-1/3" : ""}`}>
                  <div className="relative">
                    <img 
                      src={`https://images.unsplash.com/photo-${1570000000000 + index * 10000}?w=500&auto=format`} 
                      alt={creator.name} 
                      className="w-full aspect-video object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute top-3 left-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Trophy className="h-3.5 w-3.5" />
                        <span>#1 This Month</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`p-5 ${index === 0 ? "md:w-2/3" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={creator.profile_pic || `https://i.pravatar.cc/150?img=${index + 1}`} />
                        <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{creator.name}</h3>
                        <p className="text-sm text-muted-foreground">@{creator.username || creator.name.toLowerCase().replace(/\s/g, '')}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{creator.supporter_count}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {index === 0 
                        ? "Creating amazing content and building a vibrant community. Join hundreds of others supporting their journey."
                        : creator.category || "Creator"}
                    </p>
                    <Link to={`/creator/${creator.username || creator.name.toLowerCase().replace(/\s/g, '')}`}>
                      <Button variant={index === 0 ? "default" : "outline"} className="w-full">
                        <span>Visit Page</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        
        <div className="text-center mt-10">
          <Link to="/creators">
            <Button variant="outline" size="lg">
              View All Creators
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Index;
