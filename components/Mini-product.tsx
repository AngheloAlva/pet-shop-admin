import React from 'react'

import type { Product } from '@/types'
import Image from 'next/image'

interface MiniProductProps {
  product: Product
}

const MiniProduct = ({ product }: MiniProductProps): JSX.Element => {
  return (
    <div className='border rounded-md flex p-2'>
      <div>
        <Image src={product.image[0]} alt={product.name} width={150} height={0} className='rounded-md' />
      </div>
      <div className='flex flex-col gap-1 max-w-[20rem]'>
        {product.name}
        <p className='ml-5'>Opciones:</p>
        {product.options.map((option, index) => (
          <div key={index} className='ml-5 flex border rounded-md h-8 items-center gap-1 px-2 max-w-[10rem] justify-center'>
            {option.option}
            <p>-</p>
            {option.price}
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-1'>
        <p className='mx-3'>
          Brand:
          {product.brand.name}
        </p>
        <p className='mx-3'>
          Category:
          {product.category.name}
        </p>
        <p className="mx-3">
          Pet Type:
          {product.petType.map((pet, index) => (
            <span key={index}>{pet}</span>
          ))}
        </p>
        <p className="mx-3">
          Life Stage:
          {product.lifeStage}
        </p>
      </div>
    </div>
  )
}

export default MiniProduct
