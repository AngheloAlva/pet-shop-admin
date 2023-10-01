import CreateBrand from '@/components/Create-Brand'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaTableList } from 'react-icons/fa6'

const page = (): JSX.Element => {
  return (
    <div className='w-full bg-zinc-800 p-5 text-white'>
      <h1 className='text-3xl font-bold'>Brands</h1>

      <div className='flex gap-4 mt-5 flex-col'>
        <CreateBrand />
        <Link href='/categories/table' className='w-full'>
          <Button variant={'outline'} className='flex items-center gap-2 w-full'>
            <FaTableList />See Categories
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default page
