// src/services/googleApiSocios.js

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcv7VJ2cCsQmwC_F5VzARWPlztURc--gYcIXSSf4D0ciRgVz5sr-Dhuj9lWdVmjTPmig/exec'

export async function obtenerSocios() {
  try {
    const response = await fetch(SCRIPT_URL)
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }
    
    return data.data || []
    
  } catch (error) {
    console.error('Error al obtener socios:', error)
    throw error
  }
}