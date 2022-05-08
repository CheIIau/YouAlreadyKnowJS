// import path from 'path';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
// @ts-ignore
import { Nuxt, Builder } from 'nuxt';
import { connect } from 'mongoose';
import config from '../nuxt.config.js';
import { router as questionsRouter } from './routes/questions';
import { router as authRouter } from './routes/auth';
import 'dotenv/config';

const dev = process.env.NODE_ENV !== 'production';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(questionsRouter);
app.use('/auth', authRouter);
async function startMongo() {
  try {
    await connect(process.env.MONGO_URI!);
    console.log('succesfully connected to DB');
  } catch (e) {
    console.log('Server Error', e);
    process.exit(1);
  }
}
startMongo();

async function start() {
  const nuxt = new Nuxt(config);
  process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
  }); // if process on this port already exists, kill it
  app.use(nuxt.render);
  if (dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // app.listen(port, function () {
  //   console.log(6);
  // });

  // consola.ready({
  //   message: `Server listening on port: ${port}`,
  //   badge: true,
  // });
}

start();

export default app;
