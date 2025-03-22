import { Request, Response } from 'express';

import { Product } from "../../app/models/Product";
import { Category } from "../../app/models/Category";

import { THREE_MEGABYTES } from "../../constants";

export async function createProduct(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Image is required' })
      return
    }

    const { filename, size } = req.file;

    if (size > THREE_MEGABYTES) {
      res.status(400).json({ error: 'Image size is too large' })
      return
    }

    const { name, description, price, category, ingredients } = req.body

    if (!name) {
      res.status(400).json({ error: 'Name is required' })
      return
    }

    const categoryExists = await Category.findById(category)

    if (!categoryExists) {
      res.status(400).json({ error: 'Invalid category' })
      return
    }

    const product = await Product.create({
      name,
      description,
      category,
      imagePath: filename,
      price: Number(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    })

    res.status(201).json(product)
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
