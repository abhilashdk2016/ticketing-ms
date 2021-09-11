import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent  } from '@abhilashdk/common';
import { Ticket } from '../../models/tickets';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: any, msg: Message) {
        console.log(`Executing Ticket Created onMessage with data ${JSON.stringify(data._doc)}`);
        const { _id, title, price } = data._doc;
        const ticket = Ticket.build({ id: _id, title: title, price: price });
        await ticket.save();

        msg.ack();
    }
}
