import express, { Request, Response} from 'express';

const router = express.Router();

router.post('/api/users/signout', (req: Request, response: Response) => {
  req.session = null;
  response.send({ });
});

export { router as signOutRouter };
