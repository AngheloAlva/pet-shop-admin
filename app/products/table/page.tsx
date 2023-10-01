'use client'

import React from 'react'

import { getProducts } from '@/api/product'
import type { Product } from '@/types/index'
import MiniProduct from '@/components/Mini-product'
import { FaChevronLeft } from 'react-icons/fa6'
import Link from 'next/link'

const page = (): JSX.Element => {
  const [products, setProducts] = React.useState<{ total: number, products: Product[] }>({ total: 0, products: [] })
  const [page, setPage] = React.useState<number>(0)

  const productsPerPage = 10

  React.useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const from = page * productsPerPage
      const products = await getProducts([`limit=${productsPerPage}`, `from=${from}`])
      setProducts(products)
    }

    void fetchProducts()
  }, [page])

  return (
    <div className='w-full bg-zinc-800 p-5 text-white'>
      <div className='flex items-center gap-3'>
        <Link href={'/products'}>
          <FaChevronLeft />
        </Link>
        <h1 className='text-3xl font-bold'>Products</h1>
      </div>

      <div className='flex justify-end'>
        <p>Total de productos encontrados: {products.total}</p>
      </div>
      <div className='flex gap-4 mt-5 flex-col'>
        <div className='flex flex-col gap-2'>
          {
            products.products.length > 0 && products.products.map((product: Product) => (
              <MiniProduct product={product} key={product._id} />
            ))
          }
        </div>
      </div>

      <div className='flex justify-center gap-2 mt-5'>
        <button
          onClick={() => { setPage(page - 1) }}
          disabled={page === 0}
          className={`bg-zinc-700 text-white px-3 py-1 rounded-md ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <button
          onClick={() => { setPage(page + 1) }}
          disabled={productsPerPage * (page + 1) >= products.total}
          className={`bg-zinc-700 text-white px-3 py-1 rounded-md ${productsPerPage * (page + 1) >= products.total ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default page
