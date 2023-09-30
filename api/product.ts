import axios from 'axios'

import type { Product, ProductCreate } from '@/types'

const createProduct = async (product: ProductCreate): Promise<{ msg: string, newProduct: Product }> => {
  try {
    const response = await axios.post('http://localhost:3001/products', product)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al crear el producto')
  }
}

const getProducts = async (filters: string[]): Promise<{ total: number, products: Product[] }> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/products${filters.length > 0 ? `?${filters.join('&')}` : ''}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los productos')
  }
}

const updateProduct = async (product: Product): Promise<{ msg: string, product: Product }> => {
  try {
    const response = await axios.put(
      `http://localhost:3001/products/${product._id}`,
      product
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al actualizar el producto')
  }
}

const deleteProduct = async (id: string): Promise<{ msg: string, productDeleted: Product }> => {
  try {
    const response = await axios.delete(`http://localhost:3001/products/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al eliminar el producto')
  }
}

const searchProducts = async (search: string): Promise<{ total: number, products: Product[] }> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/products/search?term=${search}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al buscar los productos')
  }
}

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts
}
