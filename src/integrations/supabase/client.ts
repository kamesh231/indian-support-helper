// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oruerfnftlphnjmhbamq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ydWVyZm5mdGxwaG5qbWhiYW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTUyNzQsImV4cCI6MjA1ODAzMTI3NH0.EZB8K14ikrLqRw0RN5Mt7nkXxFURm23xvO-3ev_JYW4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);