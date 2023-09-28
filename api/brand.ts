import axios from 'axios'

import type { Brand } from '@/types'

const createBrand = async (brand: Brand): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:3001/brands', brand)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getBrands = async (limit: number, from: number): Promise<Brand[]> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/brands${'/?limit=' + limit + '&from=' + from}`
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

const deleteBrand = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:3001/brands/${id}`)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

export {
  createBrand,
  getBrands,
  deleteBrand
}
