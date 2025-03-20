
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Creator } from "@/hooks/useAuth";

export const useTopCreators = (limit: number = 5) => {
  return useQuery({
    queryKey: ["topCreators", limit],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_top_creators", { limit_count: limit });
      
      if (error) {
        console.error("Error fetching top creators:", error);
        throw error;
      }
      
      return data as Creator[];
    },
  });
};

export const useCreatorProfile = (creatorId: string | undefined) => {
  return useQuery({
    queryKey: ["creatorProfile", creatorId],
    queryFn: async () => {
      if (!creatorId) throw new Error("Creator ID is required");
      
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", creatorId)
        .single();
      
      if (error) {
        console.error("Error fetching creator profile:", error);
        throw error;
      }
      
      return data;
    },
    enabled: !!creatorId,
  });
};
