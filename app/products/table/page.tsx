'use client'

import React from 'react'
import Link from 'next/link'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { FaChevronLeft } from 'react-icons/fa6'
import MiniProduct from '@/components/Mini-product'

import { getProducts } from '@/api/product'
import { getBrands } from '@/api/brand'
import { getCategories } from '@/api/category'

import type { Brand, Category, Product } from '@/types/index'
import { Button } from '@/components/ui/button'
import FormSelect from '@/components/ui/FormSelect'
import { Label } from '@/components/ui/label'

const page = (): JSX.Element => {
  const [products, setProducts] = React.useState<{ total: number, products: Product[] }>({ total: 0, products: [] })
  const [page, setPage] = React.useState<number>(0)
  const [brands, setBrands] = React.useState<Brand[]>([])
  const [categories, setCategories] = React.useState<Category[]>([])
  const [filters, setFilters] = React.useState<{ brand: string, category: string, petType: string, lifeStage: string }>({
    brand: '',
    category: '',
    petType: '',
    lifeStage: ''
  })

  const productsPerPage = 10
  const petTypes = [{ name: 'Dog', _id: 'dog' }, { name: 'Cat', _id: 'cat' }]
  const lifeStages = [
    {
      name: 'Puppy',
      _id: 'puppy'
    }, {
      name: 'Adult',
      _id: 'adult'
    }, {
      name: 'Senior',
      _id: 'senior'
    }, {
      name: 'All Life Stages',
      _id: 'allLifeStages'
    }
  ]

  const handleFilterChange = (field: string, value: string | string[]): void => {
    setFilters({ ...filters, [field]: value })
  }

  React.useEffect(() => {
    const fetchBrands = async (): Promise<void> => {
      const brands = await getBrands()
      setBrands(brands.brands)
    }

    const fetchCategories = async (): Promise<void> => {
      const categories = await getCategories()
      setCategories(categories.categories)
    }

    void fetchBrands()
    void fetchCategories()
  }, [])

  React.useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const from = page * productsPerPage
      const products = await getProducts([`limit=${productsPerPage}`, `from=${from}`, `brand=${filters.brand}`, `category=${filters.category}`, `petType=${filters.petType}`, `lifeStage=${filters.lifeStage}`])
      setProducts(products)
    }

    void fetchProducts()
  }, [page, filters])

  return (
    <div className='w-full bg-zinc-800 p-5 text-white'>
      <div className='flex items-center gap-3'>
        <Link href={'/products'}>
          <FaChevronLeft />
        </Link>
        <h1 className='text-3xl font-bold'>Products</h1>
      </div>

      <div className='flex justify-between mt-4'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'}>Filters</Button>
          </SheetTrigger>
          <SheetContent side={'left'} className='w-80'>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetClose />
            </SheetHeader>
            <SheetDescription>
              <div className='flex flex-col gap-2'>
                <Label>Brand</Label>
                <div className='flex gap-1'>
                  <FormSelect field='brand' handleFielChange={handleFilterChange} list={brands} placeholder='Brands' value={filters.brand} />
                  <Button variant={'outline'} onClick={() => { handleFilterChange('brand', '') }}>Clear</Button>
                </div>
                <Label>Category</Label>
                <div className='flex gap-1'>
                  <FormSelect field='category' handleFielChange={handleFilterChange} list={categories} placeholder='Categories' value={filters.category} />
                  <Button variant={'outline'} onClick={() => { handleFilterChange('category', '') }}>Clear</Button>
                </div>
                <Label>Pet Type</Label>
                <div className='flex gap-1'>
                  <FormSelect field='petType' handleFielChange={handleFilterChange} list={petTypes} placeholder='Pet Type' value={filters.petType} />
                  <Button variant={'outline'} onClick={() => { handleFilterChange('petType', '') }}>Clear</Button>
                </div>
                <Label>Life Stage</Label>
                <div className='flex gap-1'>
                  <FormSelect field='lifeStage' handleFielChange={handleFilterChange} list={lifeStages} placeholder='Life Stage' value={filters.lifeStage} />
                  <Button variant={'outline'} onClick={() => { handleFilterChange('lifeStage', '') }}>Clear</Button>
                </div>
                <SheetClose>
                  <Button className='w-full mt-5'>Apply</Button>
                </SheetClose>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
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
