import { Request, Response } from 'express';

import { Category } from "../../app/models/Category";

export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body

    if (!name) {
      res.status(400).json({ error: 'Name is required' })
      return
    }

    const category = await Category.create({ icon, name })

    res.status(201).json(category)
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
