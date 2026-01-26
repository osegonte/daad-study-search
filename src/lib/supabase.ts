import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Programme = {
  id: string
  university_id: string
  title: string
  degree_type: string
  subject_area_id: string
  study_mode: string
  language_of_instruction: string
  std_period_semesters: number
  start_semester: string
  program_details: string
  nc_status: string
  ects_required: number
  tuition_fee: boolean
  moi_letter_accepted: string | null
  motiv_required: string | null
  test_required: string | null
  interview: string | null
  modul_required: string | null
  prep_course_type: string | null
  created_at: string
  updated_at: string
}

export type University = {
  id: string
  name: string
  city: string
  type: string
  website_url: string | null
  description: string | null
  created_at: string
}
