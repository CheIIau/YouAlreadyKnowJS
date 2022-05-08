import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface DecodedJwt {
  userId: string;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS' || !req.headers.authorization) {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Ошибка авторизации' });
    }
    const decodedJwt = verify(token, process.env.JWT_ACCESS_SECRET_KEY!);
    req.user = decodedJwt as DecodedJwt;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Ошибка авторизации' });
  }
}



