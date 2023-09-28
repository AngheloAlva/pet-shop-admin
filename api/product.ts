import axios from 'axios'

import type { Product } from '@/types'

const createProduct = async (product: Product): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:3001/products', product)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getProducts = async (filters: string[]): Promise<void> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/products${filters.length > 0 ? `?${filters.join('&')}` : ''}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const updateProduct = async (product: Product): Promise<void> => {
  try {
    const response = await axios.put(
      `http://localhost:3001/products/${product._id}`,
      product
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:3001/products/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const searchProducts = async (search: string): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/products/search?term=${search}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }

  return []
}

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts
}
