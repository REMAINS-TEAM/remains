import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const decodeToken = (token: string): Promise<JwtPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY || '', (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });

export default async function authMiddleware(
  req: Request & {
    user?: { id: number; paymentExpiredDate: Date; admin: boolean };
  },
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  if (!token) return next();

  try {
    const { sub, pay, admin } = await decodeToken(token);
    req.user = {
      id: sub ? +sub : 0,
      paymentExpiredDate: pay ? new Date(pay) : new Date(),
      admin: admin || false,
    };
  } catch (e) {
    // skip
  }

  next();
}
