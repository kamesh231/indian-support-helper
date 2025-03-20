
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PricingBanner />
        <HowItWorks />
        <FeaturedCreators />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

// New component for pricing information
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

export default Index;
