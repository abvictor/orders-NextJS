import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";


class ListOrdersController{
    async handle(req: Request, res: Response){
        const listOrdersSerivce = new ListOrdersService()

        const orders = await listOrdersSerivce.execute()
        console.log(orders)
        return res.json(orders)
    }
}

export { ListOrdersController }