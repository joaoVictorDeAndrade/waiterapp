import { Request, Response } from 'express';

import { Product } from "../../app/models/Product";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
