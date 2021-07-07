import { User } from '../models/user';
import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { PasswordUtil } from '../utils/password-hash';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middleware/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
const JWT_KEY = process.env.JWT_KEY || 'asdf';

router.post('/api/users/signin',[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], validateRequest, async (req: Request, response: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if(!existingUser) {
    throw new BadRequestError('Invalid Credentials');
  }

  const passwordsMatch = await PasswordUtil.compare(existingUser.password, password);
  if(!passwordsMatch) {
    throw new BadRequestError('Invalid Credentials');
  }

  // Generate JWT
  // kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
  // ! -> Instruct TS to not check for undefined as it is already handled elesewhere
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, JWT_KEY!);
  //Store on Session object
  req.session = {
    jwt: userJwt
  };
  
  response.status(200).send(existingUser);
});

export { router as signInRouter };
