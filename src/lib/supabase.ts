import { createClient } from '@supabase/supabase-js'

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

const supabaseUrl = 'https://vapgczkpuokiwsngbdft.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcGdjemtwdW9raXdzbmdiZGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjU2MjksImV4cCI6MjA2MjA0MTYyOX0.ut8xyU02r_9kNw71ccjFNAE1fbtYf2qIrOWaTlEBnGs'

console.log('Initializing Supabase client...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 