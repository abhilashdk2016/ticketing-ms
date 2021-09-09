import { Publisher, Subjects, TicketUpdatedEvent } from "@abhilashdk/common";
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}