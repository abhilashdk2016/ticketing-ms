import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middleware/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

const router = express.Router();
const JWT_KEY = process.env.JWT_KEY || 'asdf';

router.post('/api/users/signup', [
  body('email')
   .isEmail()
   .withMessage('Email Must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
], validateRequest, async (req: Request, response: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  
  if(existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const user = User.build({ email, password });
  await user.save();
  
  // Generate JWT
  // kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
  // ! -> Instruct TS to not check for undefined as it is already handled elesewhere
  const userJwt = jwt.sign({
    id: user._id,
    email: user.email
  }, JWT_KEY!);
  
  //Store on Session object
  req.session = {
    jwt: userJwt
  };
  
  response.status(201).send(user);
});

export { router as signUpRouter };
