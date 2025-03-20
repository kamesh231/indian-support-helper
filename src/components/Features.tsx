
import * as React from "react";
import { motion } from "framer-motion";
import { IndianRupee, Coffee, Users, Palette, Zap, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <IndianRupee className="h-6 w-6" />,
    title: "Indian Payment Solutions",
    description: "Seamlessly receive support in ₹ with UPI, cards, and other local payment methods.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "Simple Support",
    description: "Let your audience support you with one-time contributions – as simple as buying a chai.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Build Community",
    description: "Connect with your supporters and show appreciation for their contributions.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Customizable Profile",
    description: "Create a personalized page that matches your brand and showcases your work.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Quick Setup",
    description: "Get started in minutes with a simple verification process tailored for Indians.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <Percent className="h-6 w-6" />,
    title: "Low Platform Fee",
    description: "Only 3.5% platform fee on payments and free payouts* to maximize your earnings.",
    subheading: "So you get more in your pocket",
    color: "bg-red-100 text-red-600",
  },
];

const FeatureCard = ({ 
  feature, 
  index 
}: { 
  feature: typeof features[0], 
  index: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-sm border p-6 hover-lift"
    >
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", feature.color)}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
      {feature.subheading && (
        <p className="text-primary font-medium mt-1">{feature.subheading}</p>
      )}
      {feature.title === "Low Platform Fee" && (
        <p className="text-xs text-muted-foreground mt-2">
          *Free for amounts over ₹1000
        </p>
      )}
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Designed for Indian Creators
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Everything you need to receive support and grow your creative journey within India's unique ecosystem
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
