import { Router } from 'express';
import { QuestionsModel, Question } from '../models';
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

router.get('/allquestions', async (_req, res) => {
  try {
    const questions = (await QuestionsModel.find({})) as Array<Question>;
    res.json(questions);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

router.get('/allquestionsids', async (_req, res) => {
  try {
    const questions = (await QuestionsModel.find({})) as Array<Question>;
    const questionsIds = questions.map((question) => question._id);
    res.json(questionsIds);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' });
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
    res.status(201).json({ message: 'Тест добавлен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка на сервере. Тест не добавлен' });
  }
});

export { router };
