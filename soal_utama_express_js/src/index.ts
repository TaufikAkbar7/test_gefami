import express, { Express, NextFunction, Request, Response } from "express";
import router from './services/user/router';

const app: Express = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const customHeadersAppLevel = function (req: Request, res: Response, next: NextFunction) {
  if (req.get('User-id') === 'ifabula' && req.get('Scope') === 'user') {
    next();
  } else {
    return res.status(401).json({
      responseCode: 401,
      responseMessage: 'UNAUTHORIZED'
    })
  }
};

app.use(customHeadersAppLevel);
app.use('/api', router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});