import { supabase } from '../data/supabase'

// Obtener todos los eventos
export async function obtenerTodosLosEventos() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data || []
    
  } catch (error) {
    console.error('Error al obtener todos los eventos:', error)
    throw error
  }
}

// Obtener eventos próximos (para la página principal)
export async function obtenerEventosProximos() {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data || []
    
  } catch (error) {
    console.error('Error al obtener eventos próximos:', error)
    throw error
  }
}

// Crear evento (requiere auth)
export async function crearEvento(eventData) {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...eventData,
        updated_at: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data[0]
    
  } catch (error) {
    console.error('Error al crear evento:', error)
    throw error
  }
}

// Actualizar evento (requiere auth)
export async function actualizarEvento(id, eventData) {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({
        ...eventData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data[0]
    
  } catch (error) {
    console.error('Error al actualizar evento:', error)
    throw error
  }
}

// Eliminar evento (requiere auth)
export async function eliminarEvento(id) {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw new Error(error.message)
    }
    
    return true
    
  } catch (error) {
    console.error('Error al eliminar evento:', error)
    throw error
  }
}