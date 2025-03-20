
import * as React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Coffee, Heart, IndianRupee, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="px-4 md:px-8 mb-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            >
              About SupportSathi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              We're building the easiest way for Indian creators to receive support directly from their audience.
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 md:px-8 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  SupportSathi was founded with a simple mission — to help Indian creators unlock their creative potential by providing them with tools to build sustainable income from their audience.
                </p>
                <p className="text-lg text-muted-foreground">
                  We believe that creators in India face unique challenges, from payment infrastructure to cultural expectations. That's why we've built a platform specifically tailored to the Indian ecosystem.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-primary/20 to-blue-400/20 p-8 rounded-2xl"
              >
                <div className="flex flex-col space-y-8">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-xl mr-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Support Creators</h3>
                      <p className="text-muted-foreground">Enable fans to directly support the creators they love.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-xl mr-4">
                      <IndianRupee className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Indian Payment Solutions</h3>
                      <p className="text-muted-foreground">Built for Indian payment methods like UPI and local cards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-xl mr-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Build Community</h3>
                      <p className="text-muted-foreground">Foster meaningful connections between creators and supporters.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="px-4 md:px-8 mb-20 bg-secondary/50 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                How we started and why we're passionate about supporting Indian creators
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border"
              >
                <div className="mb-4 font-bold text-5xl text-primary/20">01</div>
                <h3 className="text-xl font-semibold mb-4">The Beginning</h3>
                <p className="text-muted-foreground">
                  SupportSathi started in 2023 when our founders, passionate content creators themselves, realized there wasn't a simple solution for Indian creators to receive direct support from their audience.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-sm border"
              >
                <div className="mb-4 font-bold text-5xl text-primary/20">02</div>
                <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                <p className="text-muted-foreground">
                  We saw that global solutions weren't designed for Indian payment systems, tax regulations, or cultural context. Indian creators needed a platform that understood their unique needs.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm border"
              >
                <div className="mb-4 font-bold text-5xl text-primary/20">03</div>
                <h3 className="text-xl font-semibold mb-4">The Solution</h3>
                <p className="text-muted-foreground">
                  SupportSathi was built from the ground up for Indian creators, with local payment integrations, compliance with Indian regulations, and a focus on the unique creator ecosystem in India.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 md:px-8 mb-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We're a small, passionate team of creators and technologists dedicated to empowering the Indian creator economy
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { name: "Arun Sharma", role: "Co-Founder & CEO", avatar: "/team/arun.jpg", initials: "AS" },
                { name: "Neha Patel", role: "Co-Founder & CTO", avatar: "/team/neha.jpg", initials: "NP" },
                { name: "Rohit Verma", role: "Head of Growth", avatar: "/team/rohit.jpg", initials: "RV" },
                { name: "Priya Malhotra", role: "Creator Relations", avatar: "/team/priya.jpg", initials: "PM" },
                { name: "Vikram Shah", role: "Product Lead", avatar: "/team/vikram.jpg", initials: "VS" },
                { name: "Anjali Desai", role: "Marketing", avatar: "/team/anjali.jpg", initials: "AD" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
                      {member.initials}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
