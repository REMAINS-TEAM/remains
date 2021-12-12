import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  // console.log(`Request...`);
  // May be redo it with GUARDS (check it)
  next();
}
