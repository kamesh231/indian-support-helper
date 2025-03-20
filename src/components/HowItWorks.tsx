
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Create your page",
    description: "Sign up and customize your support page with your details, content, and support options.",
  },
  {
    number: "02",
    title: "Share with your audience",
    description: "Share your unique link with your followers on social media, in your content, or via email.",
  },
  {
    number: "03",
    title: "Receive support",
    description: "Your supporters can now send you contributions directly through your page with Indian payment methods.",
  },
  {
    number: "04",
    title: "Thank your supporters",
    description: "Build relationships by acknowledging and thanking those who support your work.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Get started in minutes and begin receiving support from your audience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-10 left-0 text-6xl font-bold text-primary/10">
                {step.number}
              </div>
              
              {/* Content */}
              <div className="pt-12 relative">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-border" style={{ width: '50%', left: '75%' }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
