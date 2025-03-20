
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  "#F97316", // Orange (Brand)
  "#000000", // Black
  "#FFFFFF", // White
  "#FFDD00", // Yellow
  "#8B5CF6", // Purple
  "#0EA5E9", // Blue
  "#10B981", // Green
  "#EC4899", // Pink
  "#EF4444", // Red
  "#6B7280", // Gray
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div 
        className="h-10 w-10 rounded-l-md border flex items-center justify-center"
        style={{ backgroundColor: color }}
      />
      <Input
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-none border-l-0"
      />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-l-none rounded-r-md px-2 border-l-0">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="grid grid-cols-5 gap-2">
            {predefinedColors.map((c) => (
              <button
                key={c}
                className="h-8 w-8 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ backgroundColor: c }}
                onClick={() => {
                  onChange(c);
                  setIsOpen(false);
                }}
              >
                {color.toLowerCase() === c.toLowerCase() && (
                  <Check className="h-4 w-4 text-white drop-shadow-md" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
