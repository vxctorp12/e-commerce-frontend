'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    return { error: 'Por favor completa todos los campos' }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.error || 'Credenciales inválidas' }
    }

    const cookieStore = await cookies()
    cookieStore.set('token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })
  } catch (error) {
    return { error: 'Error de conexión con el servidor' }
  }
  
  redirect('/')
}

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const password_confirmation = formData.get('password_confirmation')

  if (!name || !email || !password || !password_confirmation) {
    return { error: 'Por favor completa todos los campos' }
  }

  if (password !== password_confirmation) {
    return { error: 'Las contraseñas no coinciden' }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, password_confirmation })
    })

    const data = await res.json()

    if (!res.ok) {
      // Manejar errores de validación de Laravel
      if (data.errors) {
        const firstError = Object.values(data.errors)[0] as string[];
        return { error: firstError[0] }
      }
      return { error: data.message || 'Error en el registro' }
    }

    const cookieStore = await cookies()
    cookieStore.set('token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })
  } catch (error) {
    return { error: 'Error de conexión con el servidor' }
  }
  
  redirect('/')
}

export async function logoutAction() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (token) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.error('Error al cerrar sesión en la API:', error)
        }
    }

    cookieStore.delete('token')
    redirect('/')
}
