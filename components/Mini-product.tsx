import React from 'react'

import type { Product } from '@/types'
import Image from 'next/image'

interface MiniProductProps {
  product: Product
}

const MiniProduct = ({ product }: MiniProductProps): JSX.Element => {
  return (
    <div className='border rounded-md flex p-2'>
      <Image src={product.image} alt={product.name} width={70} height={70} />
      <div className='flex flex-col gap-1 max-w-[20rem]'>
        {product.name}
        <p className='ml-5'>Opciones:</p>
        {product.weightOptions.map((option, index) => (
          <div key={index} className='ml-5 flex border rounded-md h-8 items-center gap-1 px-2 max-w-[10rem] justify-center'>
            {option.weight}
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
          {/* {product.petType.map((pet, index) => (
            <span key={index}>{pet}</span>
          ))} */}
        </p>
        <p className="mx-3">
          Life Stage:
          {product.lifeStage.map((lifeStage, index) => (
            <span key={index}>{lifeStage}</span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default MiniProduct
