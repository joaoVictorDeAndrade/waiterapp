import { Request, Response } from 'express';

import { Product } from "../../app/models/Product";

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params

    await Product.findByIdAndDelete(productId)

    res.sendStatus(204)
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
