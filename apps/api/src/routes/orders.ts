import { Router, Request, Response } from 'express';
import {
  CreateOrderService,
  InMemoryOrderRepository,
} from '@myapp/orders';
import { HTTP_STATUS } from '@myapp/shared';

const router = Router();
const orderRepository = new InMemoryOrderRepository();
const createOrderService = new CreateOrderService(orderRepository);

// Create order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const order = await createOrderService.execute(userId);
    res.status(HTTP_STATUS.CREATED).json(order);
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
});

// Get all orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await orderRepository.findAll();
    res.json(orders);
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await orderRepository.findById(req.params.id);
    if (!order) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
  }
});

export { router as ordersRouter };
