interface Brand {
  _id: string
  name: string
  image: string
  status: boolean
}

interface BrandCreate {
  name: string
  image: string
}

interface Category {
  _id: string
  name: string
  status: boolean
  description: string
  image: string
}

interface CategoryCreate {
  name: string
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
  category: Category
}

interface ProductCreate {
  name: string
  petType: string[]
  miniDescription: string
  description: ProductDescription[]
  image: string[]
  options: ProductOption[]
  brandId: string
  lifeStage: string
  categoryId: string
}

interface ProductDescription {
  title: string
  description: string
}

interface ProductOption {
  option: string
  price: number | string
  stock: number | string
  discount: number | string
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
  BrandCreate,
  Category,
  CategoryCreate,
  Product,
  ProductDescription,
  ProductCreate,
  ProductOption,
  User,
  Order
}
