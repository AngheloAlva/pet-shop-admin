import type { Category } from '@/types'
import axios from 'axios'

const createCategory = async (category: Category): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:3001/categories', category)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getCategories = async (limit: number, from: number): Promise<Category[]> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/categories${limit > 0 ? `?limit=${limit}` : ''}${from > 0 ? `&from=${from}` : ''}`
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

const updateCategory = async (category: Category): Promise<void> => {
  try {
    const response = await axios.put(`http://localhost:3001/categories/${category._id}`, category)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

const deleteCategory = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:3001/categories/${id}`)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

export {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
}
