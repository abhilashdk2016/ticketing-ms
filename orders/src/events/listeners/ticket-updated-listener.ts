import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent  } from '@abhilashdk/common';
import { Ticket } from '../../models/tickets';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;
    async onMessage(data: any, msg: Message) {
        const ticket = await Ticket.findByEvent({ id: data.id, version: data._doc.version - 1});
        if(!ticket) {
            throw new Error('Ticket not found');
        }
        const { title, price } = data._doc;
        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    }
}
