import type { Category, CategoryCreate } from '@/types'
import axios from 'axios'

const createCategory = async (category: CategoryCreate): Promise<{ msg: string, newCategory: Category }> => {
  try {
    const response = await axios.post('http://localhost:3001/categories', category)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al crear la categoría')
  }
}

const getCategories = async (limit: number = 15, from: number = 0): Promise<{ categories: Category[], total: number }> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/categories${limit > 0 ? `?limit=${limit}` : ''}${from > 0 ? `&from=${from}` : ''}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    return { categories: [], total: 0 }
  }
}

const updateCategory = async (id: string, category: CategoryCreate, status: boolean): Promise<{ msg: string, category: Category }> => {
  try {
    const response = await axios.put(`http://localhost:3001/categories/${id}`, { ...category, status })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al actualizar la categoría')
  }
}

const deleteCategory = async (id: string): Promise<{ msg: string, categoryDeleted: Category }> => {
  try {
    const response = await axios.delete(`http://localhost:3001/categories/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al eliminar la categoría')
  }
}

export {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
}
