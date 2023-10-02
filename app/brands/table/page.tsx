'use client'

import React from 'react'

import BrandCard from '@/components/Brand-Card'

import { getBrands } from '@/api/brand'
import type { Brand } from '@/types'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa6'

const page = (): JSX.Element => {
  const [brands, setBrands] = React.useState<Brand[]>([])

  React.useEffect(() => {
    const fetchBrands = async (): Promise<void> => {
      const response = await getBrands()
      setBrands(response.brands)
    }

    void fetchBrands()
  }, [])

  return (
    <div className='w-full bg-zinc-800 p-5 text-white flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <Link href={'/brands'}>
          <FaChevronLeft />
        </Link>
        <h1 className='text-3xl font-bold'>Brands</h1>
      </div>
      {
        brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} setBrands={setBrands} />
        ))
      }
    </div>
  )
}

export default page
