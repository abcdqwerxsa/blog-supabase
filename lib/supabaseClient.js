// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// 从环境变量中获取你的 Supabase URL 和 anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
