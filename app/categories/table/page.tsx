'use client'

import React from 'react'
import Link from 'next/link'

import { getCategories } from '@/api/category'
import { FaChevronLeft } from 'react-icons/fa6'

import type { Category } from '@/types'
import CategoryCard from '@/components/Category-Brand'

const page = (): JSX.Element => {
  const [categories, setCategories] = React.useState<Category[]>([])

  React.useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const response = await getCategories()
      setCategories(response.categories)
    }

    void fetchCategories()
  }, [])

  return (
    <div className='w-full bg-zinc-800 p-5 text-white flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <Link href={'/categories'}>
          <FaChevronLeft />
        </Link>
        <h1 className='text-3xl font-bold'>Categories</h1>
      </div>
      {
        categories.map((category) => (
          <CategoryCard key={category._id} category={category} setCategories={setCategories} />
        ))
      }
    </div>
  )
}

export default page
