'use client'

import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogPrimitive
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { FaScrewdriverWrench } from 'react-icons/fa6'

import { getBrands } from '@/api/brand'
import { createProduct } from '@/api/product'
import { getCategories } from '@/api/category'

import FormSelect from './ui/FormSelect'
import type { Category, Brand, ProductDescription, ProductCreate, ProductOption } from '@/types'

import '@uploadthing/react/styles.css'

const CreateProduct = (): JSX.Element => {
  const { toast } = useToast()

  const [brands, setBrands] = React.useState<Brand[]>([])
  const [categories, setCategories] = React.useState<Category[]>([])
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [currentDescription, setCurrentDescription] = React.useState<ProductDescription>({
    title: '',
    description: ''
  })
  const [currentOption, setCurrentOption] = React.useState<ProductOption>({
    option: '',
    price: '',
    stock: '',
    discount: ''
  })
  const [formData, setFormData] = React.useState<ProductCreate>({
    name: '',
    categoryId: '',
    brandId: '',
    options: [],
    description: [],
    lifeStage: [],
    image: [],
    miniDescription: '',
    petType: []
  })
  const lifeStageList = [
    {
      _id: 'puppy',
      name: 'Puppy'
    }, {
      _id: 'adult',
      name: 'Adult'
    }, {
      _id: 'senior',
      name: 'Senior'
    },
    {
      _id: 'allLifeStages',
      name: 'All Life Stages'
    }
  ]

  React.useEffect(() => {
    const getCategoriesAndBrands = async (): Promise<void> => {
      const categories = await getCategories()
      const brands = await getBrands()

      setCategories(categories.categories)
      setBrands(brands.brands)
    }

    void getCategoriesAndBrands()
  }, [])

  const handleFieldChange = (field: string, value: string | string[]): void => {
    setFormData({ ...formData, [field]: value })
  }

  const handleDescriptionChange = (field: string, value: string): void => {
    setCurrentDescription({ ...currentDescription, [field]: value })
  }

  const handleAddDescription = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setFormData({ ...formData, description: [...formData.description, currentDescription] })
    setCurrentDescription({ title: '', description: '' })
  }

  const handleCheckboxChange = (value: string, checked: boolean | string): void => {
    if (checked) {
      handleFieldChange('petType', [...formData.petType, value])
    } else {
      handleFieldChange('petType', formData.petType.filter((petType) => petType !== value))
    }
  }

  const handleImageChange = (value: string): void => {
    setFormData({ ...formData, image: [...formData.image, value] })
  }

  const handleAddOption = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    currentOption.price = Number(currentOption.price)
    currentOption.stock = Number(currentOption.stock)
    currentOption.discount = Number(currentOption.discount)

    setFormData({ ...formData, options: [...formData.options, currentOption] })
    setCurrentOption({ option: '', price: '', stock: '', discount: '' })
  }

  const handleOptionChange = (field: string, value: string | number): void => {
    setCurrentOption({ ...currentOption, [field]: value })
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (formData.name === '') {
      errors.name = 'Name is required'
    }

    if (formData.categoryId === '') {
      errors.categoryId = 'Category is required'
    }

    if (formData.brandId === '') {
      errors.brandId = 'Brand is required'
    }

    if (formData.miniDescription === '') {
      errors.miniDescription = 'Mini description is required'
    }

    if (formData.description.length === 0) {
      errors.description = 'Description is required'
    }

    if (formData.petType.length === 0) {
      errors.petType = 'Pet type is required'
    }

    if (formData.lifeStage.length === 0) {
      errors.lifeStage = 'Life stage is required'
    }

    if (formData.image.length === 0) {
      errors.image = 'Image is required'
    }

    if (formData.options.length === 0) {
      errors.options = 'Options are required'
    }

    setFormErrors(errors)

    return Object.keys(errors).length === 0
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: 'Form not valid',
        description: 'Please fill all the required fields: ' + Object.values(formErrors).join(', '),
        duration: 3000
      })
      return
    }

    try {
      const res = await createProduct(formData)

      toast({
        title: 'Product created',
        description: res.msg,
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Product not created',
        description: (error as Error).message,
        duration: 3000
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='flex items-center gap-2 w-full'>
          <FaScrewdriverWrench /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Fill the form to add a product
          </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col'>
          <Label htmlFor='name' className='mb-1'>Product Name</Label>
          <Input id='name' placeholder='Name' required onChange={(e) => { handleFieldChange('name', e.target.value) }} />

          <Label htmlFor='categoryId' className='mb-1 mt-3'>Category</Label>
          <FormSelect list={categories} field='categoryId' placeholder={'Select category'} handleFielChange={handleFieldChange} />

          <Label htmlFor='brandId' className='mb-1 mt-3'>Brand</Label>
          <FormSelect list={brands} field='brandId' placeholder={'Select brand'} handleFielChange={handleFieldChange} />

          <Label htmlFor='miniDescription' className='mb-1 mt-3'>Mini Description</Label>
          <Textarea id='miniDescription' required placeholder='Mini Description' className='max-h-[7rem]' onChange={(e) => { handleFieldChange('miniDescription', e.target.value) }} />

          <Separator className='mt-5' />
          <Label htmlFor='titleDescription' className='mb-1 mt-3'>Title Description</Label>
          <Input id='titleDescription' value={currentDescription.title} placeholder='Title Description' onChange={(e) => { handleDescriptionChange('title', e.target.value) }} />
          <Label htmlFor='description' className='mb-1 mt-3'>Description</Label>
          <Textarea id='description' value={currentDescription.description} placeholder='Description' className='max-h-[7rem]' onChange={(e) => { handleDescriptionChange('description', e.target.value) }} />
          <p className='text-xs font-semibold mt-1'>* When saving title and description the fields will be reset to save the next section of the description</p>
          <p className='text-xs font-semibold mt-1'>* To make a line brak write "\n"</p>
          <Button variant={'secondary'} className='mt-2' onClick={handleAddDescription}>
            Add Description
          </Button>
          <Separator className='mt-3' />

          <Label htmlFor='petType' className='mb-1 mt-3'>Pet Type</Label>
          <div className='flex items-center'>
            <Checkbox id='dog' value='dog' onCheckedChange={(checked) => { handleCheckboxChange('dog', checked) }} />
            <Label className='ml-1 mr-3' htmlFor='dog' >Dog</Label>
            <Checkbox id='cat' value='cat' onCheckedChange={(checked) => { handleCheckboxChange('cat', checked) }} />
            <Label className='ml-1 mr-3' htmlFor='cat'>Cat</Label>
          </div>
          <Separator className='mt-3' />

          <Label htmlFor='lifeStage' className='mb-1 mt-3'>Life Stage</Label>
          <FormSelect field='lifeStage' list={lifeStageList} placeholder='lifeStage' handleFielChange={handleFieldChange} />

          <Separator className='mt-4' />
          <Label htmlFor='image' className='mb-1 mt-3'>Image</Label>
          <UploadButton
            endpoint='imageUploader'
            onClientUploadComplete={(res) => {
              if (res === undefined || res.length === 0) return

              for (let i = 0; i < res.length; i++) {
                handleImageChange(res[i].url)
              }
            }}
            onUploadError={(error: Error) => {
              console.error(error)
            }}
          />
          <Separator className='mt-2' />

          <Label htmlFor='options' className='mb-1 mt-3'>Options</Label>
          <div className='flex flex-col gap-2'>
            <Input id='option' value={currentOption.option} placeholder='Option name | example: 7.5kg or Yellow, etc.' onChange={(e) => { handleOptionChange('option', e.target.value) }} />
            <Input id='price' value={currentOption.price} placeholder='Price' type='number' onChange={(e) => { handleOptionChange('price', e.target.value) }} />
            <Input id='stock' value={currentOption.stock} placeholder='Stock' type='number' onChange={(e) => { handleOptionChange('stock', e.target.value) }} />
            <div className="flex">
              <Input id='discount' value={currentOption.discount} placeholder='Discount' type='number' onChange={(e) => { handleOptionChange('discount', e.target.value) }} />
              <Button variant={'outline'} disabled className='w-10'>%</Button>
            </div>
            <p className='text-xs font-semibold mt-1'>* When saving the option the fields will be reset to save the next option</p>
            <Button variant={'secondary'} className='mt-2' onClick={handleAddOption}>
              Add Option
            </Button>
          </div>
        </form>
        <DialogFooter>
          <DialogPrimitive.Close>
            <Button variant={'outline'}>
              Cancel
            </Button>
          </DialogPrimitive.Close>
          <Button variant={'default'} onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProduct
