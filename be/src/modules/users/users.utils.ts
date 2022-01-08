import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export async function checkPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) resolve(false);
      resolve(true);
    });
  });
}

export const generateToken = () => uuidv4();
