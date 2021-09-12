import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent  } from '@abhilashdk/common';
import { Ticket } from '../../models/tickets';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;
    async onMessage(data: any, msg: Message) {
        const ticket = await Ticket.findByEvent(data);
        if(!ticket) {
            throw new Error('Ticket not found');
        }
        if(data.title) {
            const { title, price } = data;
            ticket.set({ title, price });
            await ticket.save();
        } else {
            const { title, price } = data._doc;
            ticket.set({ title, price });
            await ticket.save();
        }
        msg.ack();
    }
}
