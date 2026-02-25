import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Use the Service Role Key here for bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!)
