import React from 'react'

import type { Brand, BrandCreate } from '@/types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { deleteBrand, getBrands, updateBrand } from '@/api/brand'
import { useToast } from './ui/use-toast'

interface BrandCardProps {
  brand: Brand
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>
}

const BrandCard = ({ brand, setBrands }: BrandCardProps): JSX.Element => {
  const { toast } = useToast()

  const handleDelete = async (): Promise<void> => {
    await deleteBrand(brand._id)

    toast({
      title: 'Brand deleted',
      description: `The brand ${brand.name} was deleted successfully`,
      duration: 3000
    })

    const response = await getBrands()
    setBrands(response.brands)
  }

  const handleActivate = async (): Promise<void> => {
    const brandFields: BrandCreate = {
      name: brand.name,
      image: brand.image
    }
    await updateBrand(brand._id, brandFields, true)

    toast({
      title: 'Brand activated',
      description: `The brand ${brand.name} was activated successfully`,
      duration: 3000
    })

    const response = await getBrands()
    setBrands(response.brands)
  }

  return (
    <div className='flex gap-1 items-center justify-between w-full h-32 bg-zinc-700 rounded-md p-5'>
      <div className='flex gap-5 items-center justify-center'>
        <Image src={brand.image} alt={brand.name} width={100} height={10} />
        <Separator orientation='vertical' className='h-16' />
        <div>
          <p className='text-xl f ont-semibold'>Nombre: {brand.name}</p>
          <p className={`${brand.status ? 'text-lime-200' : 'text-red-500'}`}>Status: {brand.status ? 'Active' : 'Inactive'}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <Button variant={'secondary'}>
          Edit Brand
        </Button>

        {
          brand.status
            ? <Button variant={'destructive'} onClick={handleDelete}>Delete Brand</Button>
            : <Button onClick={handleActivate}>Activate Brand</Button>
        }
      </div>
    </div>
  )
}

export default BrandCard
