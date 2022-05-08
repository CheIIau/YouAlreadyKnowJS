import { Router } from 'express';

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

export { router };
