import express from 'express';
import { createUser, getUsers } from './controller';
import { validate } from '../../helpers';
import { validationCreateUser } from './validations';

const router = express.Router()
const basePath = '/users'

router.get(`${basePath}`, getUsers)
router.post(`${basePath}/create-user`, validate(validationCreateUser), createUser)

export default router