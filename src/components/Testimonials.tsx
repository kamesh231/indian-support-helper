
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "MochaFan helped me monetize my blog content directly from my Indian audience without any hassle.",
    name: "Priya Sharma",
    role: "Food Blogger",
    avatar: "/avatars/priya.jpg",
    initials: "PS",
  },
  {
    quote: "Setting up UPI payments was so easy. Now my YouTube viewers can support my indie films directly.",
    name: "Rahul Verma",
    role: "Filmmaker",
    avatar: "/avatars/rahul.jpg",
    initials: "RV",
  },
  {
    quote: "As a podcaster, this platform has given me a direct line to my listeners and a way to sustain my show.",
    name: "Anjali Mehta",
    role: "Podcaster",
    avatar: "/avatars/anjali.jpg",
    initials: "AM",
  },
];

const TestimonialCard = ({ 
  testimonial, 
  index 
}: { 
  testimonial: typeof testimonials[0], 
  index: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-sm border p-6 hover-lift"
    >
      <div className="mb-6">
        <svg
          width="45"
          height="36"
          className="fill-primary/20"
          viewBox="0 0 45 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 18H9C9 11.3726 14.3726 6 21 6V10.5C16.8579 10.5 13.5 13.8579 13.5 18ZM31.5 18H27C27 11.3726 32.3726 6 39 6V10.5C34.8579 10.5 31.5 13.8579 31.5 18Z" />
          <path d="M13.5 18C13.5 22.1421 16.8579 25.5 21 25.5V30C14.3726 30 9 24.6274 9 18H13.5ZM31.5 18C31.5 22.1421 34.8579 25.5 39 25.5V30C32.3726 30 27 24.6274 27 18H31.5Z" />
        </svg>
      </div>
      <p className="text-lg mb-6">{testimonial.quote}</p>
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={testimonial.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Loved by Indian Creators
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Hear what creators are saying about their experience with MochaFan
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
