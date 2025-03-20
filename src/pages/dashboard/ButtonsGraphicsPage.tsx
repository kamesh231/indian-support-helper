
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ButtonGenerator } from "@/components/dashboard/buttons/ButtonGenerator";
import { WidgetGenerator } from "@/components/dashboard/buttons/WidgetGenerator";
import { QRCodeGenerator } from "@/components/dashboard/buttons/QRCodeGenerator";
import { GiphyLink } from "@/components/dashboard/buttons/GiphyLink";

const ButtonsGraphicsPage = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-7xl py-8 px-4"
      >
        <h1 className="text-3xl font-bold mb-8">Buttons & Graphics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Button Generator */}
          <ButtonGenerator />
          
          {/* Widget Generator */}
          <WidgetGenerator />
          
          {/* QR Code Generator */}
          <QRCodeGenerator />
          
          {/* Giphy Link */}
          <GiphyLink />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ButtonsGraphicsPage;
