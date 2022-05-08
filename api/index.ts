// import path from 'path';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import consola from 'consola';
// @ts-ignore
import { Nuxt, Builder } from 'nuxt';
import { connect } from 'mongoose';
import config from '../nuxt.config.js';
import { router as questionsRouter } from './routes/questions';
import { router as authRouter } from './routes/auth';

const dev = process.env.NODE_ENV !== 'production';

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
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

  if (dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(nuxt.render);
  app.listen(port, function () {
    process.send!('ready');
  });

  consola.ready({
    message: `Server listening on port: ${port}`,
    badge: true,
  });
}

start();

// async function start(): Promise<void> {
//   // Init Nuxt.js
//   const nuxt = new Nuxt(config);
//   console.log(1);
//   // Build only in dev mode
//   if (dev) {
//     const builder = new Builder(nuxt);
//     console.log(2);
//     await builder.build();
//     console.log(3);
//   }
//   await nuxt.ready();
//   console.log(4);
//   app.use(nuxt.render);
//   // app.use('/auth', authRouter);
//   console.log(5);
//   app.listen(port, () => {
//     console.log(6);
//     consola.ready({
//       message: `Server listening on port ${port}`,
//       badge: true,
//     });
//   });
//   console.log(7);
// }

// start().catch((e) => {
//   console.log(e);
// });

// app.listen(port, () => {
//  console.log(`API server listening on port ${port}`);
// });

// async function start() {
//   try {
//     await connect(process.env.MONGO_URI!);
//     console.log('succesfully connected to DB');
//   } catch (e) {
//     console.log('Server Error', e);
//     process.exit(1);
//   }
// }

// async function start() {
//   const app = express();
//   const nuxt = new Nuxt(config);
//   await nuxt.ready();
//   app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')));
//   app.use(nuxt.render);
//   return app;
// }

export default app;
