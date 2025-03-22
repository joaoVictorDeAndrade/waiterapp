import { Request, Response } from 'express';

import { Category } from "../../app/models/Category";

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params

    await Category.findByIdAndDelete(categoryId)

    res.sendStatus(204)
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
