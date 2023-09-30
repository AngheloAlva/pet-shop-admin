import type { User } from '@/types'
import axios from 'axios'

const getUsers = async (limit: number, from: number): Promise<{ total: number, users: User[] }> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users${limit > 0 ? `?limit=${limit}` : ''}${from > 0 ? `&from=${from}` : ''}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    return { total: 0, users: [] }
  }
}

const getUserById = async (id: string): Promise<{ msg: string, user: User }> => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener el usuario')
  }
}

const deleteUser = async (id: string): Promise<{ msg: string, user: User }> => {
  try {
    const response = await axios.delete(`http://localhost:3001/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al eliminar el usuario')
  }
}

export {
  getUsers,
  getUserById,
  deleteUser
}
