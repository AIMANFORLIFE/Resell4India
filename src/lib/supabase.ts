import { createClient } from '@supabase/supabase-js'

// Define the environment variables type
declare global {
  interface ImportMetaEnv {
    VITE_SUPABASE_URL: string
    VITE_SUPABASE_ANON_KEY: string
  }
}

// Fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vapgczkpuokiwsngbdft.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcGdjemtwdW9raXdzbmdiZGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjU2MjksImV4cCI6MjA2MjA0MTYyOX0.ut8xyU02r_9kNw71ccjFNAE1fbtYf2qIrOWaTlEBnGs'

console.log('Initializing Supabase client...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}) 