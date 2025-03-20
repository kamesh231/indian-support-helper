
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreatorCard from "./CreatorCard";

// Sample creator data
const creators = [
  {
    id: "1",
    name: "Aditya Kapoor",
    username: "adityafilms",
    avatar: "/avatars/aditya.jpg",
    initials: "AK",
    description: "Independent filmmaker creating short films and documentaries about Indian culture and traditions.",
    category: "Filmmaker",
    supporters: 143,
  },
  {
    id: "2",
    name: "Meera Desai",
    username: "meerawrites",
    avatar: "/avatars/meera.jpg",
    initials: "MD",
    description: "Sharing authentic Indian recipes and food stories through my blog and videos.",
    category: "Food Blogger",
    supporters: 256,
  },
  {
    id: "3",
    name: "Vikram Singh",
    username: "vikramtalks",
    avatar: "/avatars/vikram.jpg",
    initials: "VS",
    description: "Podcaster discussing technology and startups in the Indian ecosystem.",
    category: "Podcaster",
    supporters: 198,
  },
];

const FeaturedCreators = () => {
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
            Featured Creators
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Discover and support these talented Indian creators
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <CreatorCard key={creator.id} creator={creator} index={index} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="rounded-full text-base px-8 hover-lift" asChild>
            <Link to="/creators">View all creators</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreators;
