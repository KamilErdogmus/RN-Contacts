import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  surname: Yup.string()
    .min(2, 'Surname is too short')
    .max(50, 'Surname is too long')
    .required('Surname is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Please enter only numbers')
    .min(10, 'Phone number is too short')
    .max(11, 'Phone number is too long')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  job: Yup.string()
    .min(2, 'Job title is too short')
    .max(50, 'Job title is too long')
    .nullable(),
  address: Yup.string()
    .min(5, 'Address is too short')
    .max(200, 'Address is too long')
    .nullable(),
});
