import { extend } from 'vee-validate'
import {
  required,
  numeric,
  double,
  email,
  between,
} from 'vee-validate/dist/rules'
import {
  CURRENCY_VALIDATION_REGEX,
  DATE_VALIDATION_REGEX,
  DATE_WITH_TIME_VALIDATION_REGEX,
  PHONE_VALIDATION_REGEX,
} from '~/constants/regex'

extend('currency', {
  validate: (value) => CURRENCY_VALIDATION_REGEX.test(value),
  message: 'This field must have to be digit with two digits after dot',
})

extend('required', {
  ...required,
  message: 'The field is required',
})

extend('date', {
  validate: (value) => DATE_VALIDATION_REGEX.test(value),
  message: 'Date must be in mm/dd/yyyy format',
})

extend('dateWithTime', {
  validate: (value) => DATE_WITH_TIME_VALIDATION_REGEX.test(value),
  message: 'Date must be in mm/dd/yyyy hh:mm format',
})

extend('phone', {
  validate: (value) => PHONE_VALIDATION_REGEX.test(value),
  message: 'Phone must be in (123) 456-7890 format',
})

extend('numeric', {
  ...numeric,
  message: 'This field must be numeric',
})

extend('double', {
  ...double,
  message: 'This should not contain letters',
})

extend('email', {
  ...email,
  message: 'Email is not valid',
})

extend('between', {
  ...between,
  message: 'Amount is bigger than left to distribute',
})
