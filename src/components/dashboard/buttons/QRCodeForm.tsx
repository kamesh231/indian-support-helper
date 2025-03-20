
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorPicker } from "./ColorPicker";

const formSchema = z.object({
  size: z.string().min(1, "Size is required"),
  foregroundColor: z.string().min(1, "Foreground color is required"),
  backgroundColor: z.string().min(1, "Background color is required"),
});

interface QRCodeFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: z.infer<typeof formSchema>;
}

export const QRCodeForm: React.FC<QRCodeFormProps> = ({ 
  onSubmit,
  defaultValues = {
    size: "200",
    foregroundColor: "#000000",
    backgroundColor: "#FFFFFF"
  }
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size (px)</FormLabel>
              <FormControl>
                <Input type="number" min="100" max="500" {...field} />
              </FormControl>
              <FormDescription>
                Size of the QR code in pixels (100-500)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="foregroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foreground Color</FormLabel>
                <FormControl>
                  <ColorPicker 
                    color={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Color</FormLabel>
                <FormControl>
                  <ColorPicker 
                    color={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full">
          Generate QR Code
        </Button>
      </form>
    </Form>
  );
};
