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
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { FaScrewdriverWrench } from 'react-icons/fa6'

import { createBrand } from '@/api/brand'

import type { BrandCreate } from '@/types'

import '@uploadthing/react/styles.css'

const CreateBrand = (): JSX.Element => {
  const { toast } = useToast()

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [formData, setFormData] = React.useState<BrandCreate>({
    name: '',
    image: ''
  })

  const handleFieldChange = (field: string, value: string | string[]): void => {
    setFormData({ ...formData, [field]: value })
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (formData.name === '') {
      errors.name = 'Name is required'
    }

    if (formData.image === '') {
      errors.image = 'Image is required'
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
      const res = await createBrand(formData)

      toast({
        title: 'Product created',
        description: res.msg,
        duration: 3000
      })

      setFormData({
        name: '',
        image: ''
      })

      setFormErrors(
        {
          name: 'Name is required',
          image: 'Image is required'
        }
      )
    } catch (error) {
      toast({
        title: 'Product not created',
        description: (error as Error).message,
        duration: 3000
      })
    }
  }

  const handleCancel = (): void => {
    setFormData({
      name: '',
      image: ''
    })

    setFormErrors(
      {
        name: 'Name is required',
        image: 'Image is required'
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='flex items-center gap-2 w-full'>
          <FaScrewdriverWrench /> Add Brand
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle>Add Brand</DialogTitle>
          <DialogDescription>
            Fill the form to add a new Brand
          </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' name='name' placeholder='Name' value={formData.name} onChange={(e) => { handleFieldChange('name', e.target.value) }} />

          <Separator className='mt-5' />
          <Label className='mt-2'>Image</Label>
          {
            formData.image.length === 0
              ? <UploadButton
                  endpoint='imageUploader'
                  className='mt-6'
                  onClientUploadComplete={(res) => {
                    if (res === undefined || res.length === 0) return
                    handleFieldChange('image', res[0].url)

                    toast({
                      title: 'Image uploaded',
                      description: 'Image uploaded successfully',
                      duration: 3000
                    })
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      title: 'Image not uploaded',
                      description: error.message,
                      duration: 3000,
                      variant: 'destructive'
                    })
                  }}
                />
              : <p className='text-gray-400'>Image alredy uploaded</p>
          }
          <Separator className='mt-4' />
        </form>
        <DialogFooter>
          <DialogPrimitive.Close>
            <Button variant={'outline'} onClick={handleCancel}>
              Cancel
            </Button>
          </DialogPrimitive.Close>
          <DialogPrimitive.Close>
            <Button variant={'default'} onClick={(e) => { handleSave(e) }}>
              Save
            </Button>
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBrand
