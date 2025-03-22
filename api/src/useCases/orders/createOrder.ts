import { Request, Response } from 'express';

import { Order } from "../../app/models/Order";
import {io} from "../../index";

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body

    if (!table) {
      res.status(400).json({ error: 'Table is required' })
      return
    }

    const order = await Order.create({ table, products })
    const orderDetails = await order.populate('products.product')

    io.emit('orders@create', orderDetails)

    res.status(201).json(order)
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
