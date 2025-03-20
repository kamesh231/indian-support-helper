
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-5xl w-full mx-auto text-center z-10">
        {/* Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6"
        >
          <span className="mr-2">🇮🇳</span>
          Made for Indian creators
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-balance"
        >
          Let your fans support your creative journey
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance"
        >
          MochaFan is a simple way for Indian creators to receive support, build community, and sustain their creativity with hassle-free payments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="rounded-full text-base px-8 hover-lift h-12 w-full sm:w-auto" asChild>
            <Link to="/auth?tab=register">
              Start creating
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full text-base px-8 hover-lift h-12 w-full sm:w-auto" asChild>
            <Link to="/creators">
              Explore creators
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-1/4 right-[10%] hidden lg:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="glass-effect p-3 rounded-xl shadow-sm flex items-center">
          <IndianRupee className="text-primary h-5 w-5 mr-2" />
          <span className="font-medium">Support creators directly</span>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-1/4 left-[10%] hidden lg:block"
        animate={{ y: [0, 15, 0] }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      >
        <div className="glass-effect p-3 rounded-xl shadow-sm">
          <span className="font-medium">Made for Indian creators 🇮🇳</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
