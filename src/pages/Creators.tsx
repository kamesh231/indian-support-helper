
import * as React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorCard from "@/components/CreatorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Extended sample creator data
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
  {
    id: "4",
    name: "Priya Sharma",
    username: "priyamusic",
    avatar: "/avatars/priya.jpg",
    initials: "PS",
    description: "Creating original Indian fusion music and covers of popular Bollywood songs.",
    category: "Musician",
    supporters: 312,
  },
  {
    id: "5",
    name: "Rahul Verma",
    username: "rahuldraws",
    avatar: "/avatars/rahul.jpg",
    initials: "RV",
    description: "Digital artist creating illustrations inspired by Indian mythology and culture.",
    category: "Digital Artist",
    supporters: 173,
  },
  {
    id: "6",
    name: "Anjali Mehta",
    username: "anjalireads",
    avatar: "/avatars/anjali.jpg",
    initials: "AM",
    description: "Book reviewer focusing on Indian literature and translations. I share reading recommendations weekly.",
    category: "Book Reviewer",
    supporters: 87,
  },
  {
    id: "7",
    name: "Arjun Nair",
    username: "arjuncodes",
    avatar: "/avatars/arjun.jpg",
    initials: "AN",
    description: "Teaching coding and web development with tutorials in Hindi and English.",
    category: "Educator",
    supporters: 245,
  },
  {
    id: "8",
    name: "Divya Reddy",
    username: "divyafitness",
    avatar: "/avatars/divya.jpg",
    initials: "DR",
    description: "Fitness trainer sharing yoga and workout routines adapted for Indian lifestyles.",
    category: "Fitness",
    supporters: 163,
  },
  {
    id: "9",
    name: "Karan Malhotra",
    username: "karantravels",
    avatar: "/avatars/karan.jpg",
    initials: "KM",
    description: "Travel vlogger exploring hidden gems across India and sharing authentic experiences.",
    category: "Travel",
    supporters: 209,
  },
];

// Categories
const categories = [
  "All",
  "Filmmaker",
  "Food Blogger",
  "Podcaster",
  "Musician",
  "Digital Artist",
  "Book Reviewer",
  "Educator",
  "Fitness",
  "Travel",
];

const CreatorsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredCreators = React.useMemo(() => {
    return creators.filter((creator) => {
      const matchesSearch = 
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = 
        selectedCategory === "All" || creator.category === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="px-4 md:px-8 mb-12">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Discover Creators
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Explore and support talented Indian creators across various categories
            </motion.p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="px-4 md:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search creators..."
                  className="pl-10 h-12 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Creators Grid */}
        <section className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredCreators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCreators.map((creator, index) => (
                  <CreatorCard key={creator.id} creator={creator} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No creators found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatorsPage;
