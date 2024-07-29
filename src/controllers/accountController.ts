import { Request, Response } from 'express';
import Account from '../models/account';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const accountExists = await Account.findOne({ email });

    if (accountExists) {
      res.status(400);
      throw new Error('Account already exists');
    }

    const account = await Account.create({ email, password, role });

    res.status(201).json({
      _id: account.id,
      email: account.email,
      role: account.role,
      token: generateToken(account._id),
    });
  } catch (error:any) {
    res.status(400).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });

    if (account && (await bcrypt.compare(password, account.password))) {
      res.json({
        _id: account.id,
        email: account.email,
        role: account.role,
        token: generateToken(account._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

const generateToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '', {
    expiresIn: '30d',
  });
};

export { register, login };
