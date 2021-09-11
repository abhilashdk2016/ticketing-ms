import { Listener, NotFoundError, OrderCancelledEvent, Subjects } from '@abhilashdk/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: any, msg: Message) {
        // Find the ticket that the order is reserving
        const ticket= await Ticket.findById(data.ticket.id);
        // If ticket not found, throw error
        if(!ticket) {
            throw new NotFoundError();
        }
        // Un-Reserve the ticket, by setting orderid property
        ticket.set({ orderId: undefined });

        // Save the ticket
        await ticket.save();

        // Publish Ticket update Event
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.title,
            orderId: ticket.orderId,
            price: ticket.price,
            version: ticket.version,
            userId: ticket.userId
        });

        // ack the message
        msg.ack();
    }
}