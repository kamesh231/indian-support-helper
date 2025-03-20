export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      payout_requests: {
        Row: {
          amount_requested: number
          created_at: string
          creator_id: string
          id: string
          payout_reference: string | null
          status: Database["public"]["Enums"]["payout_status"]
        }
        Insert: {
          amount_requested: number
          created_at?: string
          creator_id: string
          id?: string
          payout_reference?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
        }
        Update: {
          amount_requested?: number
          created_at?: string
          creator_id?: string
          id?: string
          payout_reference?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payout_requests_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tips: {
        Row: {
          amount: number
          anonymous: boolean | null
          creator_id: string
          gst: number
          id: string
          net_amount: number
          platform_fee: number
          timestamp: string
        }
        Insert: {
          amount: number
          anonymous?: boolean | null
          creator_id: string
          gst: number
          id?: string
          net_amount: number
          platform_fee: number
          timestamp?: string
        }
        Update: {
          amount?: number
          anonymous?: boolean | null
          creator_id?: string
          gst?: number
          id?: string
          net_amount?: number
          platform_fee?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "tips_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bank_account: string | null
          bio: string | null
          created_at: string
          creating_text: string | null
          email: string
          icon_text: string | null
          id: string
          ifsc_code: string | null
          kyc_completed: boolean | null
          name: string
          page_icon: string | null
          profile_pic: string | null
          show_supporter_count: boolean | null
          social_link: string | null
          supporter_count: number | null
          theme_color: string | null
          total_tips: number | null
          username: string | null
          video_link: string | null
        }
        Insert: {
          bank_account?: string | null
          bio?: string | null
          created_at?: string
          creating_text?: string | null
          email: string
          icon_text?: string | null
          id: string
          ifsc_code?: string | null
          kyc_completed?: boolean | null
          name: string
          page_icon?: string | null
          profile_pic?: string | null
          show_supporter_count?: boolean | null
          social_link?: string | null
          supporter_count?: number | null
          theme_color?: string | null
          total_tips?: number | null
          username?: string | null
          video_link?: string | null
        }
        Update: {
          bank_account?: string | null
          bio?: string | null
          created_at?: string
          creating_text?: string | null
          email?: string
          icon_text?: string | null
          id?: string
          ifsc_code?: string | null
          kyc_completed?: boolean | null
          name?: string
          page_icon?: string | null
          profile_pic?: string | null
          show_supporter_count?: boolean | null
          social_link?: string | null
          supporter_count?: number | null
          theme_color?: string | null
          total_tips?: number | null
          username?: string | null
          video_link?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_tip: {
        Args: {
          p_creator_id: string
          p_amount: number
          p_anonymous?: boolean
        }
        Returns: string
      }
      get_top_creators: {
        Args: {
          limit_count?: number
        }
        Returns: {
          id: string
          name: string
          profile_pic: string
          total_tips: number
          supporter_count: number
        }[]
      }
      request_payout: {
        Args: {
          p_creator_id: string
          p_amount: number
        }
        Returns: string
      }
    }
    Enums: {
      payout_status: "pending" | "approved" | "paid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
