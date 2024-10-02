import { InputProps } from '@components/text-input/type'
import { Control } from 'react-hook-form'

export interface FormInputProps extends InputProps {
  name: string
  control: Control<any>
}
