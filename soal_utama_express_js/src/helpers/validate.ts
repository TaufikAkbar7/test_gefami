import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from "express";

const validate = (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
  await Promise.all(validations.map(validation => validation.run(req)))

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return next()
}

export default validate