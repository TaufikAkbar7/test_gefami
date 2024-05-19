import { body } from 'express-validator';

const validationCreateUser = [
  body('name')
    .isString()
    .withMessage('name must be string!')
    .isAlpha()
    .withMessage('name must be alphabet!')
    .notEmpty()
    .withMessage('name is required!')
    .escape(),

  body('email')
    .isEmail()
    .withMessage('email not valid!')
    .notEmpty()
    .withMessage('alamat is required!')
    .escape(),

  body('password')
    .isStrongPassword()
    .withMessage('password minimum 8 length with lowercase, uppercase, number and symbols!')
    .notEmpty()
    .withMessage('password is required!')
    .escape()
]

export { validationCreateUser }