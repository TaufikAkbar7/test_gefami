import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
    const dummyData = [
        {
            'name': 'John Doe',
            'age': 17
        },
        {
            'name': 'Jone Doe',
            'age': 17
        }
    ]
    return res.status(200).json({
      responseCode: 200,
      responseMessage: 'SUCCESS',
      data: dummyData
    })
}

const createUser = async (req: Request, res: Response) => {
    const { email } = req.body
    return res.status(201).json({
      responseCode: 201,
      responseMessage: 'SUCCESS',
      data: `Successfully create user with email ${email}`
    })
}

export { getUsers, createUser }
