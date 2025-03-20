
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-effect py-16 px-6 md:px-12 rounded-3xl border shadow-sm"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to be supported for your creative work?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of Indian creators who are building sustainable income streams with support from their audience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full text-base px-8 hover-lift h-12 w-full sm:w-auto" asChild>
              <Link to="/signup">
                Create your page
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full text-base px-8 hover-lift h-12 w-full sm:w-auto" asChild>
              <Link to="/about">
                Learn more
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
