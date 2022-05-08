import { hash, compare } from 'bcryptjs';
import { Router, Request, Response, RequestHandler } from 'express';
import { sign } from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth';
import { UserDataModel } from '../models/index';

const router = Router();

interface requestRegisterBody {
  email: string;
  password: string;
}

router.post('/register', (async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as requestRegisterBody;
    const existingUser = await UserDataModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким ником уже существует' });
    }
    const hashedPassword = await hash(password, 5);
    const user = new UserDataModel({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'Вы зарегистрированы' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
}) as RequestHandler);

router.post('/login', (async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as requestRegisterBody;
    const user = await UserDataModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Нет пользователя с таким ником' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const accessToken = sign(
      { userId: user.id as string },
      process.env.JWT_ACCESS_SECRET_KEY!,
      { expiresIn: '5d' }
    );

    res.status(200).json({
      message: 'Вы вошли в аккаунт',
      token: accessToken,
      userId: user.id as string,
    });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
}) as RequestHandler);

router.get('/auth', verifyToken, async (req: Request, res: Response) => {
  try {
    res.set('Content-Type', 'application/json');
    const user = await UserDataModel.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(400).json({ message: 'Не удалось авторизоваться' });
    }
    const accessToken = sign(
      { userId: user.id as string },
      process.env.JWT_ACCESS_SECRET_KEY!,
      { expiresIn: '5d' }
    );
    res.status(200).json({
      message: 'Вы вошли в аккаунт',
      token: accessToken,
      userId: user.id as string,
    });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

export { router };
