import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'hello world' });
});

app.listen(3000);
