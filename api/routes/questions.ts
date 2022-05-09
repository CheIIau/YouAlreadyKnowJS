import { Router } from 'express';
import { QuestionsModel } from '../models';
const router = Router();

// Mock Users
const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

router.get('/questions', function (_req, res) {
  res.json(users);
});

router.get('/questions/:id', function (req, res) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

router.post('/addquestion', async (req, res) => {
  try {
    const {
      question,
      code,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
    } = req.body;
    const answers = [];
    answers.push(answer1, answer2, answer3, answer4);
    const questionData = new QuestionsModel({
      question,
      code,
      answers,
      correctAnswer,
    });
    await questionData.save();
    res.status(201).json({ message: 'Вопрос добавлен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка на сервере. Вопрос не добавлен' });
  }
});

export { router };
