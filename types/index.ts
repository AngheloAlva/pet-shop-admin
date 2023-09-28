interface Brand {
  _id: string
  name: string
  image: string
  state: boolean
}

interface Category {
  _id: string
  name: string
  state: boolean
  description: string
  image: string
}

interface Product {
  _id: string
  name: string
  petType: string[]
  miniDescription: string
  description: ProductDescription[]
  image: string[]
  options: ProductOption[]
  brand: Brand
  lifeStage: string[]
}

interface ProductDescription {
  title: string
  description: string
}

interface ProductOption {
  option: string
  price: number
  stock: number
  discount: number
}

interface User {
  id: string
  name: string
  lastName: string
  email: string
  status: boolean
  cart: Cart[]
  RUT: string
  address: UserAddress
  phone: string
}

interface UserAddress {
  street: string
  number: number
  region: string
  comuna: string
  isApartment: boolean
  apartmentNumber: number
  zipCode: string
}

interface Cart {
  product: Product
  quantity: number
  optionSelectedIndex: number
}

interface Order {
  id: string
  userId: string
  RUT: string
  products: Cart[]
  total: number
  shippingAddress: UserAddress
  shippingMethod: string
  shippingStatus: string
}

export type {
  Brand,
  Category,
  Product,
  User,
  Order
}
