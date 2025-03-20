
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Custom MochaCup icon component with a slightly modified Coffee icon
  const MochaCup = () => (
    <div className="relative">
      <Coffee className="h-8 w-8 text-primary" />
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-primary/20 rounded-full" />
    </div>
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
        isScrolled ? "glass-effect py-2 shadow-sm" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <MochaCup />
          <span className="font-bold text-xl md:text-2xl">MochaFan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/creators" 
            className="font-medium hover:text-primary transition-all-300"
          >
            Creators
          </Link>
          <Link 
            to="/about" 
            className="font-medium hover:text-primary transition-all-300"
          >
            About
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="rounded-full hover-lift"
              asChild
            >
              <Link to="/auth">Login</Link>
            </Button>
            <Button 
              className="rounded-full hover-lift"
              asChild
            >
              <Link to="/auth?tab=register">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu} 
          className="md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-effect mt-2 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/creators" 
              className="font-medium py-2 hover:text-primary transition-all-300"
              onClick={toggleMenu}
            >
              Creators
            </Link>
            <Link 
              to="/about" 
              className="font-medium py-2 hover:text-primary transition-all-300"
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button 
                variant="outline" 
                className="w-full rounded-full"
                asChild
              >
                <Link to="/auth" onClick={toggleMenu}>Login</Link>
              </Button>
              <Button 
                className="w-full rounded-full"
                asChild
              >
                <Link to="/auth?tab=register" onClick={toggleMenu}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
