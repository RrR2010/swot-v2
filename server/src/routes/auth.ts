import express from 'express'
import jwt from 'jsonwebtoken'

import { UnauthenticatedError } from '../types/errors'

const authConfig = require('../config/auth')

const router = express.Router()

router.all("/*", (req, res, next) => {
  const token = req.headers['authorization'] as string;

  jwt.verify(token, authConfig.secret, (err: any, userInfo: any) => {
    if (err) {
      next(new UnauthenticatedError());
      return;
    }
    req.body.loggedUserId = userInfo.id;
    next(err);
  });
});

export default router