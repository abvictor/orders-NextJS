import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";


class ListOrdersController{
    async handle(req: Request, res: Response){
        const listOrdersSerivce = new ListOrdersService()

        const orders = await listOrdersSerivce.execute()

        return res.json(orders)
    }
}

export { ListOrdersController }