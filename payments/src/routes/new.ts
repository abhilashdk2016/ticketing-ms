import express, { Request, Response } from 'express';
import{ body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus
} from '@abhilashdk/common';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { PaymentCreatedEvent } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/payments', requireAuth, [
    body('token')
    .not()
    .isEmpty(),
    body('orderId')
    .not()
    .isEmpty()
], validateRequest, async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if(!order){
        throw new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    if(order.status === OrderStatus.Cancelled) {
        throw new BadRequestError("Order is already Cancelled, cannot pay.");
    }

    // await stripe.charges.create({
    //     currency: 'usd',
    //     amount: order.price * 10,
    //     source: token
    // });

    console.log('As there is an issue with Individual Account in India. Stripe payments was not possible. So by default success is being returned from this API');
    new PaymentCreatedEvent(natsWrapper.client).publish({
        id: 'abcd',
        orderId: order.id,
        stripeId: 'defg'
    });
    res.status(201).send({ id: 'abcd', message: "Success. Returning Fake Payment Id." });
});

export { router as createchargeRouter };