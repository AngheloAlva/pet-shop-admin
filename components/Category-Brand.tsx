import React from 'react'

import type { Category, CategoryCreate } from '@/types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { deleteCategory, getCategories, updateCategory } from '@/api/category'
import { useToast } from './ui/use-toast'

interface CategoryCardProps {
  category: Category
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

const CategoryCard = ({ category, setCategories }: CategoryCardProps): JSX.Element => {
  const { toast } = useToast()

  const handleDelete = async (): Promise<void> => {
    await deleteCategory(category._id)

    toast({
      title: 'Brand deleted',
      description: `The brand ${category.name} was deleted successfully`,
      duration: 3000
    })

    const response = await getCategories()
    setCategories(response.categories)
  }

  const handleActivate = async (): Promise<void> => {
    const categoryFields: CategoryCreate = {
      name: category.name,
      description: category.description,
      image: category.image
    }
    await updateCategory(category._id, categoryFields, true)

    toast({
      title: 'Brand activated',
      description: `The brand ${category.name} was activated successfully`,
      duration: 3000
    })

    const response = await getCategories()
    setCategories(response.categories)
  }

  return (
    <div className='flex gap-1 items-center justify-between w-full h-32 bg-zinc-700 rounded-md p-5'>
      <div className='flex gap-5 items-center justify-center'>
        <Image src={category.image} alt={category.name} width={100} height={10} />
        <Separator orientation='vertical' className='h-16' />
        <div>
          <p className='text-xl f ont-semibold'>Nombre: {category.name}</p>
          <p className={`${category.status ? 'text-lime-200' : 'text-red-500'}`}>Status: {category.status ? 'Active' : 'Inactive'}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <Button variant={'secondary'}>
          Edit Category
        </Button>

        {
          category.status
            ? <Button variant={'destructive'} onClick={handleDelete}>Delete Brand</Button>
            : <Button onClick={handleActivate}>Activate Brand</Button>
        }
      </div>
    </div>
  )
}

export default CategoryCard
