import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemOrderService";

class AddItemController{
    async handle(req: Request, res: Response){
        
        const { amount, order_id, product_id } = req.body

        const addItemService = new AddItemService();

        const order = addItemService.execute({
                amount: amount,
                order_id: order_id,
                product_id: product_id
        })

        return res.json(order)
    }
}

export { AddItemController }