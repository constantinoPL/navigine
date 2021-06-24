import express, { Express } from 'express';
import { deviceRouter } from './Device/device.router';
import { errorMiddleware } from './infrastructure/Exceptions/error.middleware';
import { sequelize } from './infrastructure/orm';

const app: Express = express();

const { API_PORT } = process.env;

app.use(express.json());

app.all('*', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin ? req.headers.origin : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use('/device', deviceRouter);
app.use(errorMiddleware);

sequelize
  .sync()
  .then(() => {
    console.log('\nDatabase connection has been established successfully.\n');
  })
  .catch((err) => {
    console.error('\nUnable to connect to the database:', err);
  });

app.listen(API_PORT, () => {
  console.log('\nserver started on port ' + API_PORT + '\n');
});
