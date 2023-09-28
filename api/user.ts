import axios from 'axios'

const getUsers = async (limit: number, from: number): Promise<void> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users${limit > 0 ? `?limit=${limit}` : ''}${from > 0 ? `&from=${from}` : ''}`
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:3001/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  getUsers,
  deleteUser
}
