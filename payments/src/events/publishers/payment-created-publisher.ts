import { Subjects, Publisher, paymentCreatedEvent } from '@abhilashdk/common';

export class PaymentCreatedEvent extends Publisher<paymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}