import { Message } from 'node-nats-streaming';
import { Subjects, Listener, paymentCreatedEvent, OrderStatus  } from '@abhilashdk/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<paymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;
  
    async onMessage(data: paymentCreatedEvent['data'], msg: Message) {
      const { orderId } = data;
      const order = await Order.findById(orderId);
      if(!order) {
          throw new Error("Order Not found");
      }
      order.set({ status: OrderStatus.Complete });
      await order.save();
      msg.ack();
    }
  }
  
