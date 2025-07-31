import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ttjznryujvujsryyurbi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0anpucnl1anZ1anNyeXl1cmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNDQ0OTIsImV4cCI6MjA2NjgyMDQ5Mn0.3Y-q0qFG-z7DWAGvvnfwBzIn_2zyC1LiJCTiaydG-YM'

export const supabase = createClient(supabaseUrl, supabaseKey)
