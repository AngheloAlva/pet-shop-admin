import axios from 'axios'

import type { Brand, BrandCreate } from '@/types'

const createBrand = async (brand: BrandCreate): Promise<{ msg: string, newBrand: Brand }> => {
  try {
    const response = await axios.post('http://localhost:3001/brands', brand)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al crear la marca')
  }
}

const getBrands = async (limit: number = 10, from: number = 0): Promise<{ brands: Brand[], total: number }> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/brands${limit > 0 ? `?limit=${limit}` : ''}${from > 0 ? `&from=${from}` : ''}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    return { brands: [], total: 0 }
  }
}

const deleteBrand = async (id: string): Promise<{ msg: string, brandDeleted: Brand }> => {
  try {
    const response = await axios.delete(`http://localhost:3001/brands/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al eliminar la marca')
  }
}

export {
  createBrand,
  getBrands,
  deleteBrand
}
