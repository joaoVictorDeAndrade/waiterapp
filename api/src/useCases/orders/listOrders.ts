import { Request, Response } from 'express';

import { Order } from "../../app/models/Order";

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find().sort({ createdAt: 1 }).populate('products.product');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
