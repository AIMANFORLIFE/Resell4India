import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vapgczkpuokiwsngbdft.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcGdjemtwdW9raXdzbmdiZGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjU2MjksImV4cCI6MjA2MjA0MTYyOX0.ut8xyU02r_9kNw71ccjFNAE1fbtYf2qIrOWaTlEBnGs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 