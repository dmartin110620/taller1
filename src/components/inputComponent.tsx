import React, { useEffect, useState } from 'react'

type Validator = (value: string) => (string | undefined) | Promise<string | undefined>

type Props = {
  onChange: (value: string) => void
  name: string
  validator?: Validator | Validator[]
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  defaultValue?: string
  className?: string
  disabled?: boolean
}

const InputComponent = ({ onChange, name, validator, placeholder, type, defaultValue, className, disabled }: Props) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [value, setValue] = useState(defaultValue ?? '')

  useEffect(() => {
    if (!errorMessage) {
      onChange(value)
    }
  }, [value])

  const onInputChange = async (value: string) => {
    setErrorMessage('')
    if (!validator) {
      setValue(value)
      return
    }

    let errorMessage = ''

    if (Array.isArray(validator)) {
      for (let index = 0; index < validator.length; index++) {
        const element = await validator[index](value);

        if (element) {
          errorMessage = element
        }
      }
    } else {
      const message = await validator(value)

      if (message) {
        errorMessage = message
      }
    }

    if (!errorMessage) {
      setValue(value)
      return
    }

    setValue(value)
    setErrorMessage(errorMessage)
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className='className="text-sm text-gray-300 mb-2"'>
        {name}
      </label>
      <input value={value} onChange={(e) => onInputChange(e.target.value)}
        className='p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder={placeholder}
        type={type}
        disabled={disabled}
      />
      <p className='text-red-500'>{errorMessage}</p>
    </div>
  )
}

export default InputComponent