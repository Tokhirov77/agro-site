import { createClient } from "@supabase/supabase-js";

// TODO: вставьте сюда ваши реальные значения из Supabase:
// Dashboard → Project Settings → API
// "Project URL" и "anon public" ключ
const SUPABASE_URL = "https://uxyepkkjisixbkwwtojr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_yca9XHLfFR7ulEySrVFE9A_BBP7zCuZ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
