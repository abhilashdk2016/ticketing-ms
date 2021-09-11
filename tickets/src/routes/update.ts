import express, { Request, Response  } from 'express';
import { body } from 'express-validator';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NotFoundError } from '../errors/not-found-error';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';
import { requireAuth } from '../middleware/require-auth';
import { validateRequest } from '../middleware/validate-request';
import { Ticket } from '../models/ticket';
import { BadRequestError } from '@abhilashdk/common';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if(!ticket) {
    throw new NotFoundError();
  }

  // Presence of order id means it is reserved and updates should be prevented
  if(ticket.orderId) {
    throw new BadRequestError("Ticket is Reserved and cannot be edited");
  }

  if (ticket.userId !== req.currentUser!.id) {
    return new NotAuthorizedError("Not Authorized");
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price
  });
  await ticket.save();
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    ...ticket,
    version: ticket.version
  });
  res.send(ticket);
});

export { router as updateTicketRouter };
