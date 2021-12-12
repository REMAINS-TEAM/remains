import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  // console.log(`Request...`);
  // Check token and add user.roles to request
  next();
}
