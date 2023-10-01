'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteProduct, searchProducts, updateProduct } from '@/api/product'
import { FaPenRuler, FaRegTrashCan, FaTableList, FaMagnifyingGlass } from 'react-icons/fa6'

import type { Product } from '@/types/index'
import MiniProduct from '@/components/Mini-product'
import CreateProduct from '@/components/Create-Product'
import Link from 'next/link'

const page = (): JSX.Element => {
  const [products, setProducts] = React.useState<Product[]>([])

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const searchQuery = e.target.value

    if (searchQuery.length === 0) {
      setProducts([])
      return
    }

    if (searchQuery.length >= 2) {
      const products = await searchProducts(searchQuery)
      setProducts(products.products)
    } else {
      setProducts([])
    }
  }

  return (
    <div className='w-full bg-zinc-800 p-5 text-white'>
      <h1 className='text-3xl font-bold'>Products</h1>

      <div className='flex gap-4 mt-5 flex-col'>
        <CreateProduct />
        <Link href='/products/table' className='w-full'>
          <Button variant={'outline'} className='flex items-center gap-2 w-full'>
            <FaTableList />See Products
          </Button>
        </Link>
        <div className='flex gap-1'>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Input onChange={handleSearchChange} placeholder='Search product' className='flex items-center gap-2' />
          <FaMagnifyingGlass className='border-input border text-2xl h-9 rounded-md w-9 p-1' />
        </div>

        <div className='flex flex-col gap-2'>
          {
            products.length > 0 && products.map((product) => (
              <MiniProduct product={product} key={product._id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

// <Button variant={'outline'} className='flex items-center gap-2'>
//   <FaPenRuler />Edit Product
// </Button>
// <Button variant={'outline'} className='flex items-center gap-2'>
//   <FaRegTrashCan />Delete Product
// </Button>

export default page
