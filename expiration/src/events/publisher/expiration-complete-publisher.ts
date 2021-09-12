import { Publisher, ExpirationCompleteEvent, Subjects } from '@abhilashdk/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}