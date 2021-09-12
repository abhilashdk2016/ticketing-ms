import { Listener, NotFoundError, OrderCancelledEvent, OrderStatus, Subjects } from '@abhilashdk/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving
        const order = await Order.findOne({ _id: data.id, version: data.version - 1});
        // If order not found, throw error
        if(!order) {
            console.log('Order not found')
            throw new NotFoundError();
        }
        // Cancell the order, by setting orderid property
        order.set({ status: OrderStatus.Cancelled });

        // Save the order
        await order.save();

        // ack the message
        msg.ack();
    }
}