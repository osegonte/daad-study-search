import { supabase } from './supabase'

// Add programme to watchlist
export async function addToWatchlist(userId: string, programmeId: string) {
  try {
    const { error } = await supabase
      .from('user_watchlist')
      .insert([
        {
          user_id: userId,
          program_id: programmeId,
          added_at: new Date().toISOString()
        }
      ])

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    console.error('Error adding to watchlist:', error)
    return { success: false, error: error as Error }
  }
}

// Remove programme from watchlist
export async function removeFromWatchlist(userId: string, programmeId: string) {
  try {
    const { error } = await supabase
      .from('user_watchlist')
      .delete()
      .eq('user_id', userId)
      .eq('program_id', programmeId)

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    console.error('Error removing from watchlist:', error)
    return { success: false, error: error as Error }
  }
}

// Check if programme is in watchlist
export async function isInWatchlist(userId: string, programmeId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_watchlist')
      .select('id')
      .eq('user_id', userId)
      .eq('program_id', programmeId)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned (not in watchlist)
      console.error('Error checking watchlist:', error)
    }

    return !!data
  } catch (error) {
    console.error('Error checking watchlist:', error)
    return false
  }
}

// Get all watchlist items for a user
export async function getWatchlist(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_watchlist')
      .select(`
        id,
        added_at,
        program:programs (
          id,
          title,
          degree_type,
          language_of_instruction,
          start_semester,
          nc_status,
          tuition_fee,
          study_mode,
          ects_required,
          university:universities(name, city, type),
          subject_area:subject_areas(name)
        )
      `)
      .eq('user_id', userId)
      .order('added_at', { ascending: false })

    if (error) throw error

    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    return { data: [], error: error as Error }
  }
}

// Toggle watchlist (add if not present, remove if present)
export async function toggleWatchlist(userId: string, programmeId: string) {
  const inWatchlist = await isInWatchlist(userId, programmeId)
  
  if (inWatchlist) {
    return await removeFromWatchlist(userId, programmeId)
  } else {
    return await addToWatchlist(userId, programmeId)
  }
}