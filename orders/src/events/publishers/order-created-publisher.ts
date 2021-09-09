import { Publisher, OrderCreatedEvent, Subjects } from '@abhilashdk/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}