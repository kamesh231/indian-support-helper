
import * as React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

interface CreatorCardProps {
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    initials: string;
    description: string;
    category: string;
    supporters: number;
  };
  index: number;
}

const CreatorCard = ({ creator, index }: CreatorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-sm border overflow-hidden hover-lift"
    >
      <div className="h-24 bg-gradient-to-r from-primary/20 to-blue-400/20" />
      <div className="px-6 pt-0 pb-6 -mt-12">
        <Avatar className="h-20 w-20 ring-4 ring-white">
          <AvatarImage src={creator.avatar} />
          <AvatarFallback className="text-lg bg-primary/10 text-primary">
            {creator.initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold">{creator.name}</h3>
          <p className="text-muted-foreground text-sm">@{creator.username}</p>
          
          <div className="mt-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              {creator.category}
            </span>
          </div>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">{creator.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{creator.supporters}</span> supporters
            </div>
            <Button className="rounded-full" size="sm" asChild>
              <Link to={`/creator/${creator.username}`}>
                <Coffee className="h-4 w-4 mr-2" /> Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorCard;
