import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import {
  CURRENCY_VALIDATION_REGEX,
  DATE_VALIDATION_REGEX,
} from '~/constants/constants'

extend('currency', {
  validate: (value) => CURRENCY_VALIDATION_REGEX.test(value),
  message: 'This field must have to be digit with two digits after dot',
})

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('date', {
  validate: (value) => DATE_VALIDATION_REGEX.test(value),
  message: 'Date must be in mm/dd/yyy format',
})
