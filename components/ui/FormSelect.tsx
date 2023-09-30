import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  field: string
  placeholder: string
  list: Array<{
    _id: string
    name: string
  }>
  handleFielChange: (field: string, value: string | string[]) => void
}

const FormSelect = ({ field, placeholder, list, handleFielChange }: Props): JSX.Element => {
  return (
    <Select required onValueChange={(e) => { handleFielChange(field, e) }}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {
          list.map((item, index) => (
            <SelectItem value={item._id} key={index}>
              {item.name}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}

export default FormSelect
