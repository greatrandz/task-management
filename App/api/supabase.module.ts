import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const YOUR_REACT_NATIVE_SUPABASE_URL = "https://tmeqekgihvidgcpmiqhz.supabase.co"
const YOUR_REACT_NATIVE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZXFla2dpaHZpZGdjcG1pcWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNTA1MTEsImV4cCI6MjA1NjgyNjUxMX0.2_JTkYuM6qmqVZQkdhNCTfy-za-ceEd3MYipnuLSaKE"

const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})